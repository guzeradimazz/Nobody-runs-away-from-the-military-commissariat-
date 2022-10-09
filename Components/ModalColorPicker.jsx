import {
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    FlatList
} from 'react-native'

export const ModalColorPicker = ({
    modalVisible,
    setModalVisible,
    setColor,
    color
}) => {
    const COLORS = [
        { id: 1, color: '#d73964' },
        { id: 2, color: '#d23440' },
        { id: 3, color: '#db643a' },
        { id: 4, color: '#e88334' },
        { id: 5, color: '#e2a71e' },
        { id: 6, color: '#e25241' },
        { id: 7, color: '#d0da59' },
        { id: 8, color: '#4053ae' },
        { id: 9, color: '#70b949' },
        { id: 10, color: '#73564a' },
        { id: 11, color: '#67ab5a' },
        { id: 12, color: '#8f36aa' },
        { id: 13, color: '#f6c244' },
        { id: 14, color: '#52b9d0' },
        { id: 15, color: '#4595ec' },
        { id: 16, color: '#009688' }
    ]

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <FlatList
                                display='flex'
                                alignItems='center'
                                flexDirection='column'
                                paddingLeft={10}
                                paddingRight={10}
                                marginBottom={10}
                                width={350}
                                height={200}
                                style={{ margin: 5 }}
                                data={COLORS}
                                numColumns={4}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            setColor(item.color)
                                        }}
                                    >
                                        <View
                                            style={{
                                                shadowColor: `${item.color}`,
                                                shadowOffset: {
                                                    width: 3,
                                                    height: 3
                                                },
                                                shadowOpacity: 0.6,
                                                shadowRadius: 5,
                                                backgroundColor: item.color,
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                margin: 10
                                            }}
                                        ></View>
                                    </Pressable>
                                )}
                            />
                        </View>
                        <Pressable
                            style={{
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginTop: -20,
                                borderColor: color
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ color: color }}>Select color</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        top: 150,
        left: 50,
        position: 'absolute',
        width: '76%',
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        width: '100%',
        height: '100%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
