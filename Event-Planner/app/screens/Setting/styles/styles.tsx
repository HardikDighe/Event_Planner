import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#051650',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        marginLeft: 16,
    },
    profileSection: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    profileName: {
        fontSize: 18,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
});

export default styles;
