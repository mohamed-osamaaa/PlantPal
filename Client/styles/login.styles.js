import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#f6f8f6",
        justifyContent: "space-between",
        paddingVertical: hp("9%"),
    },
    main: {
        flex: 1,
        paddingHorizontal: wp("6%"),
        alignItems: "center",
    },
    iconCircle: {
        height: wp("10%"),
        width: wp("10%"),
        borderRadius: wp("5%"),
        backgroundColor: "rgba(23,207,23,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: wp("6%"),
        fontWeight: "700",
        color: "#112111",
        fontFamily: "Lexend",
    },
    form: {
        width: "100%",
        marginTop: hp("3%"),
    },
    input: {
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        borderWidth: 2,
        borderRadius: wp("3%"),
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("4%"),
        color: "#112111",
        fontSize: wp("4%"),
        marginBottom: hp("1.5%"),
    },
    button: {
        backgroundColor: "#17cf17",
        paddingVertical: hp("2%"),
        borderRadius: wp("3%"),
        marginTop: hp("2%"),
        shadowColor: "#17cf17",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: wp("4%"),
    },
    footerText: {
        marginTop: hp("2.5%"),
        alignItems: "center",
    },
    smallText: {
        fontSize: wp("3.6%"),
        color: "#6b7280",
        marginBottom: 5,
    },
    link: {
        color: "#17cf17",
        fontWeight: "600",
    },
    errorText: {
        color: "red",
        marginTop: 6,
        marginBottom: 6,
        fontSize: 13,
    },
    errorTextCenter: {
        color: "red",
        textAlign: "center",
        marginVertical: 8,
    },
});
