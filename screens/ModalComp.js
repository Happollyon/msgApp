import {Text,Portal,Modal,useTheme} from 'react-native-paper';
import { useState,useEffect } from 'react';

export default function ModalComp({navigation,Title, Message,getVisible}) {

    const [state, setState] = useState({
        visible: getVisible(),
    });
    
    useEffect(() => {
        setState({ ...state, visible: getVisible()});
    }, [getVisible]); // This tells React to call our effect when `getVisible` changes
const theme = useTheme();
const hideModal = () => { // Function to hide the modal
    setState({ ...state, visible: false}); // Set the visible to false
}


return(    
    <Portal>
    <Modal visible={state.visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height:"50%", width:"90%",borderRadius:30,alignSelf:"center",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <Text variant="displaySmall" style={{marginBottom:"15%"}}>{Title}</Text>
    <Text variant="titleMedium" style={{marginBottom:"15%"}}>{Message}</Text>     
    </Modal>
    </Portal>
)
}