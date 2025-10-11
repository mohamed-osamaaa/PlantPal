import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f6f8f6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        backgroundColor: '#f6f8f6',
    },
    headerBtn: {
        padding: hp('1%'),
        borderRadius: 50,
    },
    headerTitle: {
        fontSize: wp('5%'),
        fontWeight: '700',
        color: '#111811',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plantImage: {
        width: '100%',
        height: hp('30%'),
        resizeMode: 'cover',
    },
    container: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
    },
    name: {
        fontSize: wp('7%'),
        fontWeight: '700',
        color: '#111811',
    },
    subtitle: {
        fontSize: wp('4%'),
        color: '#6b7280',
        marginTop: hp('0.5%'),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2.5%'),
        marginTop: hp('3%'),
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        marginBottom: hp('1.5%'),
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('0.8%'),
    },
    infoLabel: {
        fontSize: wp('4%'),
        color: '#6b7280',
    },
    infoValue: {
        fontSize: wp('4.2%'),
        color: '#111811',
        fontWeight: '500',
    },
    highlight: {
        color: '#17cf17',
    },
    wateredBtn: {
        marginTop: hp('8%'),
        backgroundColor: '#17cf17',
        paddingVertical: hp('1.8%'),
        borderRadius: 999,
        alignItems: 'center',
    },
    wateredText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
    },
});
