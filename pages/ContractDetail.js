import React, {useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Alert,Linking } from 'react-native';
import { List, Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';

function formatCurrency(e) {
  let string;
  if(typeof(e) == 'number'){
      string = e.toString();
  }else if(typeof(e) == 'undefined'){
    string = ''
  }else{
      string = e
  }

  var n = string.replace(/(?!\.)\D/g, "") 
  .replace(/(?:\..*)\./g, "") 
  .replace(/(?:\.\d\d\d).*/g, "") 
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if(n.includes('.')){
      return `$${n}`;
  }else{
      return `$${n}.00`
  }
}

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
   
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Button style={{width:100, marginHorizontal: '35%', marginVertical: 10}} icon='link' mode="contained" title={children} onPress={handlePress}>
      Fuente
    </Button>
    )
    ;
};


export default function ContractDetail (props){
    const data = props.route.params.params
    
    return(
        <ScrollView style={styles.scrollView}>
         

            <List.Section title={data.compiledRelease.tender?.title ?? `Licitacion Desconocida#${data.compiledRelease.tender.id}`}>
              <List.Accordion
                title="Detalle Contrato"
                left={props => <List.Icon {...props} icon="mail" />}>
                  <Card  style={styles.cardtype}>
                    <List.Item title='Publicador:' description={data.compiledRelease.publisher.name}/>
                    <List.Item title="URL:" description={data.compiledRelease.publisher.uri}/>
                    <List.Item title="OCID:" description={data.compiledRelease.ocid}/>
                    <List.Item title="Ciclo:" description={data.compiledRelease.ciclo}/>
                    <List.Item title="Tender:" description={data.compiledRelease.tender.id}/>
                  </Card>
              </List.Accordion>

              <List.Accordion
                title="Participantes"
                left={props => <List.Icon {...props} icon="calendar" />}>
                {data.compiledRelease.parties.map((element, index)=> {
                  return(
                    <Card key={element.id+index} style={styles.cardtype}>
                      <List.Item title='Role:' description={element.roles}/>
                      <List.Item title="Contacto:" description={element.contactPoint.name}/>
                      <List.Item title="Nombre Legal:" description={element.identifier.legalName}/>
                    </Card> 
                    
                  )
                })

                }
              </List.Accordion>

              <List.Accordion
                title="Contratos"
                left={props => <List.Icon {...props} icon="folder" />}>
                {data.compiledRelease.contracts.map((element,index ) => {
                  return(
                     <Card key={element.id+index} style={styles.cardtype}>
                       <Text style={styles.title}> {element.title} </Text>
                       <List.Item title='Fecha Inicio:'  description={element.period.startDate} />
                       <List.Item title='Fecha Final:' description={element.period.endDate} />
                       <List.Item title='Duracion del contrato:' description={element.period.durationInDays} dias />
                       <List.Item title='Fecha Firmada:' description={element.dateSigned} />
                       <List.Item title='Tipo de Contrato:' description={element.contractDetails.contractType} />
                       <List.Item title='Valor Original:' description={formatCurrency(element.contractDetails.originalCurrencyValue.amount)} />
                       <List.Item title='Moneda:' description={element.contractDetails.originalCurrencyValue.currency} />
                       <List.Item title='ID:' description={element.id}  />
                     </Card>
                  )
                })}
              </List.Accordion>
            </List.Section>
          
          <OpenURLButton url={data.compiledRelease.planning.budget.budgetBreakdown[0].url}>Fuente</OpenURLButton>
        </ScrollView>
      )
  }

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardtype:{
      width: '90%',
      marginHorizontal:20,
      marginVertical:15,
      paddingVertical:10,
      backgroundColor: '#fff',
      borderRadius:10,
    },
    title:{
      fontSize: 21,

      fontWeight: 'bold'
    },
    subtitle:{
      marginVertical:2,
      marginLeft:10,

    },
    scrollView: {
      flex: 1,
      width:'100%'
    },  
  });
  

  // <Card style={{width: '80%', marginLeft:40, marginVertical:30}}>
  //     <Card.Title 
  //         title='hola'
  //         subtitle='denada'
  //     />
  //     <Card.Content>
  //         <Title>Contract id:</Title>
  //         <Paragraph>jejej</Paragraph>
  //     </Card.Content>
  // </Card>