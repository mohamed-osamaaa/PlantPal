import {
  existsSync,
  mkdirSync,
} from 'fs';
import { diskStorage } from 'multer';
import {
  extname,
  join,
} from 'path';
import { AuthenticationGuard } from 'src/utils/authentication.guard';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreatePlantDto } from './dto/create-plant.dto';
import { PlantsService } from './plants.service';

function imageFileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new BadRequestException('Only image files are allowed!'), false);
  }
  cb(null, true);
}

// Use /tmp for serverless environments (Vercel), otherwise use local uploads folder
const UPLOAD_PATH = process.env.PRODUCTION 
  ? '/tmp/uploads' 
  : join(process.cwd(), 'uploads');

if (!existsSync(UPLOAD_PATH)) {
  mkdirSync(UPLOAD_PATH, { recursive: true });
}

const storage = diskStorage({
  destination: UPLOAD_PATH,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `plant-${uniqueSuffix}${ext}`);
  },
});

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) { }


  @UseGuards(AuthenticationGuard)
  @Get()
  async getAllPlants(@Req() req: any) {
    try {
      const userId = req.currentUser?.id;

      if (!userId) throw new BadRequestException('Authenticated user not found');

      const plants = await this.plantsService.findAllPlantsByUser(userId);

      return {
        message: 'Plants fetched successfully',
        // count: plants.length,
        plants,
      };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async createPlant(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() createDto: CreatePlantDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.currentUser?.id;
      if (!userId) throw new BadRequestException('Authenticated user not found');

      // file may be undefined when the client doesn't upload an image; service handles this
      const plant = await this.plantsService.create(createDto, file, userId);
      return {
        message: 'Plant created successfully',
        plant,
      };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id/water')
  @HttpCode(HttpStatus.OK) // return 200 instead of 201 (default for POST)
  async markWatered(@Param('id') id: string, @Req() req: any) {
    try {
      const userId = req.currentUser?.id;
      if (!userId) throw new BadRequestException('Authenticated user not found');

      const plant = await this.plantsService.markWatered(id, userId);
      return {
        message: 'Plant marked as watered',
        plant,
      };
    } catch (err) {
      throw err;
    }
  }


  @UseGuards(AuthenticationGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPlantById(@Param('id') id: string, @Req() req: any) {
    try {
      const userId = req.currentUser?.id;
      if (!userId) throw new BadRequestException('Authenticated user not found');

      const plant = await this.plantsService.findPlantById(id, userId);

      return {
        message: 'Plant fetched successfully',
        plant,
      };
    } catch (err) {
      throw err;
    }
  }

}
