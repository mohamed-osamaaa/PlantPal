import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f8f6",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp("6%"),
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: wp("4%"),
        paddingVertical: hp("4%"),
        paddingHorizontal: wp("5%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontFamily: "Lexend",
        fontSize: wp("5.5%"),
        fontWeight: "700",
        color: "#112111",
        marginBottom: hp("2%"),
        textAlign: "center",
    },
    logoutButton: {
        backgroundColor: "#17cf17",
        borderRadius: wp("3%"),
        paddingVertical: hp("2%"),
        marginTop: hp("1%"),
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#17cf17",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    logoutText: {
        color: "#112111",
        fontSize: wp("4%"),
        fontWeight: "700",
    },
});
