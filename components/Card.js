import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React, {useContext} from 'react';
import {
    NavigationContext,
  } from '@react-navigation/native';


const LeftContent = props => <Avatar.Icon {...props} icon="archive-outline" />

export default function CardContract(props){
    const navigation = useContext(NavigationContext)
    return(
        <Pressable style={styles.contentCard} onPress={() => navigation.navigate('Detalle Contrato',{params: props.data})}>
            <Card>
                <Card.Title 
                    title={props.data.compiledRelease.tender?.title ?? `Licitacion Desconocida#${props.data.compiledRelease.tender.id}` } 
                    subtitle={props.data.compiledRelease.publisher.name} 
                    left={LeftContent}  
                />
                <Card.Content>
                    <Title>Contract id:</Title>
                    <Paragraph>{props.data.compiledRelease.id}</Paragraph>
                    <Title>Fecha Contrato:</Title>
                    <Paragraph>{props.data.compiledRelease.date}</Paragraph>
                    <Paragraph>Contratos:{props.data.compiledRelease.contracts.length}  Participantes:{props.data.compiledRelease.parties.length}</Paragraph>
                    
                    
                </Card.Content>
            </Card>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contentCard:{
        width:'90%',
        marginHorizontal: 20,
        marginVertical: 15
    }
})