import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f6f8f6",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("5%"),
        marginBottom: hp("3%"),
        backgroundColor: "#f6f8f6",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(23, 207, 23, 0.2)",
    },
    headerTitle: {
        fontSize: wp("5.5%"),
        fontWeight: "700",
        color: "#112111",
    },
    addButton: {
        backgroundColor: "#17cf17",
        borderRadius: wp("6%"),
        width: wp("11%"),
        height: wp("11%"),
        justifyContent: "center",
        alignItems: "center",
    },
    listContainer: {
        paddingHorizontal: wp("5%"),
        paddingBottom: hp("15%"),
    },
    plantCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: wp("4%"),
        padding: wp("3%"),
        marginBottom: hp("2%"),
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    plantImage: {
        width: wp("18%"),
        height: wp("18%"),
        borderRadius: wp("3%"),
        marginRight: wp("4%"),
    },
    plantInfo: {
        flex: 1,
    },
    plantName: {
        fontSize: wp("4.5%"),
        fontWeight: "700",
        color: "#112111",
    },
    wateringText: {
        fontSize: wp("3.8%"),
        color: "#64748b",
        marginTop: hp("0.3%"),
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "rgba(23, 207, 23, 0.2)",
        backgroundColor: "#f6f8f6",
        paddingVertical: hp("1.5%"),
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    navItemActive: {
        alignItems: "center",
        justifyContent: "center",
    },
    navText: {
        fontSize: wp("3%"),
        color: "#6b7280",
        fontWeight: "500",
        marginTop: hp("0.3%"),
    },
    navTextActive: {
        fontSize: wp("3%"),
        color: "#17cf17",
        fontWeight: "600",
        marginTop: hp("0.3%"),
    },
});
