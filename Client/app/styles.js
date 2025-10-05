import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: hp("9%"),
        paddingHorizontal: wp("6%"),
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: wp("80%"),
        height: hp("35%"),
        borderRadius: 16,
        marginBottom: hp("4%"),
        resizeMode: "contain",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontFamily: "Lexend",
        fontSize: wp("7%"),
        fontWeight: "700",
        textAlign: "center",
    },
    subtitle: {
        fontFamily: "Lexend",
        fontSize: wp("4%"),
        textAlign: "center",
        marginTop: hp("1%"),
        paddingHorizontal: wp("6%"),
    },
    buttonsContainer: {
        width: "100%",
        marginTop: hp("5%"),
        marginBottom: hp("2%"),
    },
    primaryButton: {
        paddingVertical: hp("2%"),
        borderRadius: 12,
        alignItems: "center",
        marginBottom: hp("2%"),
    },
    primaryText: {
        color: "#112111",
        fontWeight: "700",
        fontSize: wp("4.5%"),
    },
    secondaryButton: {
        paddingVertical: hp("2%"),
        borderRadius: 12,
        alignItems: "center",
    },
    secondaryText: {
        fontWeight: "700",
        fontSize: wp("4.5%"),
    },
});
