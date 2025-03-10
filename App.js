import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addDoc, collection, firestore, MESSAGES, serverTimestamp, query, onSnapshot, deleteDoc, doc } from './firebase/Config';
import { useEffect, useState } from 'react';



export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempMessages.push({...doc.data(),id: doc.id})
      })
      setMessages(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES),{
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setNewMessage('')
    console.log('Message saved')
  }

  const removeMessage = async (id) => {
    try {
      await deleteDoc(doc(firestore, MESSAGES, id));
      console.log('Message deleted');
    } catch (error) {
      console.log('Error deleting message:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontWeight: "bold"}}>Shopping list</Text>

      <View style={styles.form}>
        <TextInput
          placeholder='Send message...'
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <Button 
          title='Save'
          onPress={save}
        />
      </View>
      <ScrollView>
        {
          messages.map((message)=> (
            <View key={message.id} style={styles.message}>
              <Text>{message.text}</Text>
              <Button
                title='Remove'
                onPress={() => removeMessage(message.id)}
              />

            </View>
           
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8
  },form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },message: {
    margin: 16,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',


    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  }
});
