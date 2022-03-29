import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView,  } from 'react-native';
//components
import CardContract from '../components/Card'
import { Button,Menu, Divider, Provider } from 'react-native-paper';


export default function Home({navigation}) {
    const [loading, setloading] = useState(true)
    const [visible, setVisible] = useState(true);
    const [active, setactive] = useState([])
    const [filtercontract, setfilterContract] = useState([])
    
    const [pageSize, setpageSize] = useState('5')
    const [page, setpage] = useState('1')

    //funciones
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const changeInfo= (number) => {
        if(number !== pageSize){
            setVisible(false)
            setloading(true)
            setTimeout(() => {
                setpageSize(number)
                
            }, 200);     
        }
    }

    const changePage = (number) =>{
        setVisible(false)
        setloading(true)
        setTimeout(() => {
            setpage(number)
            
        }, 200);
    }
    useEffect(() => {
      fetch(`https://api.datos.gob.mx/v2/Records?page=${page}&pageSize=${pageSize}`)
        .then((response) => response.json())
        .then(data => { 
            setfilterContract(data.results), 
            setloading(false)
        })
    },[pageSize,page])
    return (
        <Provider>
        <ScrollView style={styles.scrollView}>
        { loading &&
            <View style={[styles.container, styles.content]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
            
        { loading==false && 
            filtercontract.map((element, index) =>{
                return(
                    <CardContract 
                        key={element._id+index }
                        data={element}
                        
                    />
                )
            })
        }
        
            <View style={styles.content_btn}  >
                <Button style={styles.btn} mode='contained' onPress={()=> changePage('1')}>1</Button>
                <Button style={styles.btn} mode='contained' onPress={()=> changePage('2')}>2</Button>
                <Button style={styles.btn} mode='contained' onPress={()=> changePage('3')}>3</Button>
                <Button style={styles.btn} mode='contained' onPress={()=> changePage('4')}>4</Button>
                <Button style={styles.btn} mode='contained' onPress={()=> changePage('5')}>5</Button>
            </View>
            <View style={{marginHorizontal:'5%', marginVertical:30}} >
                    <Menu
                        style={{marginTop:-140}}
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button onPress={openMenu} mode='contained' >Mostrar Cantidad </Button>}>
                        <Menu.Item onPress={() => {changeInfo('5')}} title="5" />
                        <Menu.Item onPress={() => {changeInfo('10')}} title="10" />
                        <Divider />
                        <Menu.Item onPress={() => {changeInfo('15')}} title="15" />
                    </Menu>
            </View>
           
        
        </ScrollView>
            </Provider>
    );
  }


  const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: 'auto',
        
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:30
    },
    scrollView: {
        flex:1,
        
        // backgroundColor: 'red',
    },
    content:{
        height: '100%',
    },
    content_btn:{
        width:'90%',
        flexDirection: 'row',
        justifyContent: 'space-around',

        marginHorizontal: '5%'
    },
    btn:{
        width:1,
        marginHorizontal: 10
    }
  });
  