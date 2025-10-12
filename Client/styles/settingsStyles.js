import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8f6',
        paddingHorizontal: wp(4),
        paddingTop: hp(2),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
    },
    headerTitle: {
        fontSize: hp(2.4),
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
        color: '#111811',
    },
    iconButton: {
        padding: hp(0.8),
    },
    section: {
        marginTop: hp(2),
    },
    sectionTitle: {
        fontSize: hp(2.1),
        fontWeight: '700',
        marginBottom: hp(1),
        color: '#111811',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: hp(1),
        padding: hp(2),
        marginBottom: hp(1.5),
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    dropdownCard: {
        alignItems: 'flex-start',
        zIndex: 1000,
    },
    cardTitle: {
        fontSize: hp(1.9),
        fontWeight: '500',
        color: '#111811',
    },
    cardSubtitle: {
        fontSize: hp(1.6),
        marginTop: hp(0.3),
        color: '#17cf17b3',
    },
    dropdownWrapper: {
        width: wp(35),
        marginTop: hp(1),
        zIndex: 1000,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#17cf17',
        backgroundColor: '#fff',
        borderRadius: hp(1),
        height: hp(5),
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#17cf17',
        backgroundColor: '#fff',
        borderRadius: hp(1),
    },
    dropdownText: {
        fontSize: hp(1.7),
        fontWeight: '500',
        color: '#111811',
    },
    dropdownItem: {
        fontSize: hp(1.7),
        color: '#111811',
    },
});

export default styles;