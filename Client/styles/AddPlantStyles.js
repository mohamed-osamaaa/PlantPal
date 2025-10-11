import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f6f8f6",
        paddingHorizontal: wp("6%"),
        paddingVertical: hp("5%"),
        alignItems: "center",
    },
    title: {
        fontSize: wp("6%"),
        fontWeight: "700",
        marginBottom: hp("3%"),
        color: "#112111",
    },
    imagePicker: {
        width: wp("40%"),
        height: wp("40%"),
        borderRadius: wp("20%"),
        borderWidth: 2,
        borderColor: "#17cf17",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f0",
        marginBottom: hp("3%"),
    },
    imagePlaceholder: {
        color: "#638863",
        fontSize: wp("4%"),
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: wp("20%"),
    },
    inputContainer: {
        width: "100%",
        marginBottom: hp("2%"),
    },
    label: {
        fontSize: wp("4%"),
        marginBottom: hp("1%"),
        color: "#112111",
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#f0f4f0",
        borderRadius: 12,
        paddingVertical: hp("1.8%"),
        paddingHorizontal: wp("4%"),
        fontSize: wp("4%"),
        color: "#111811",
    },
    errorText: {
        color: "red",
        marginTop: hp("0.5%"),
        fontSize: wp("3.5%"),
    },
    submitButton: {
        width: "100%",
        backgroundColor: "#17cf17",
        borderRadius: 16,
        paddingVertical: hp("2%"),
        alignItems: "center",
        marginTop: hp("3%"),
    },
    submitText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: wp("4.5%"),
    },
    pickerContainer: {
        borderWidth: wp("0.3%"),
        borderColor: "#ccc",
        borderRadius: wp("3%"),
        overflow: "hidden",
        marginTop: hp("1%"),
        backgroundColor: "#f0f4f0",
    },
    picker: {
        height: hp("6%"),
        width: "100%",
        fontSize: wp("4%"),
    },
    dropdown: {
        backgroundColor: "#f0f4f0",
        borderColor: "#17cf17",
        borderWidth: 1.5,
        borderRadius: 12,
        marginTop: hp("1%"),
        height: hp("6.5%"),
    },
    dropdownContainer: {
        borderColor: "#17cf17",
        backgroundColor: "#ffffff",
        borderRadius: 12,
    },
    dropdownText: {
        fontSize: wp("4%"),
        color: "#112111",
    },
    dropdownPlaceholder: {
        color: "#6b7280",
        fontSize: wp("4%"),
    },
});
