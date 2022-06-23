import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, Image, Text, TextInput } from 'react-native'

export default function App () {
  const[digimons, setDigimons] = useState([])
  const[list, setList] = useState([])
  const[searchText, setSearchText] = useState('')

  //Responsável por puxar todos os dados da digimon-api
  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon', {
      method: 'GET',
      headers: {
        'Accept':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setDigimons(data)
      setList(data)
    })
  }, [])

  //Reponsável por filtrar os dados da lista de digimons ao pesquisar por nome
  useEffect(() => {
    if (searchText === '') {
      setList(digimons);
    } else {
      setList(
        digimons.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  return(
    <View>
      <View style={styles.header}>
        <Text style={styles.title}> Digimons</Text>
          <View>
              <TextInput
                style={styles.search}
                placeholder="Pesquisar"
                value={searchText}
                onChangeText={(t) => setSearchText(t)}
              />
          </View>
      </View>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item}) => {
          return(
              <View style={styles.menu}>
                  <Text style={styles.text}>Nome: {item.name}</Text>
                  <Text style={styles.text}>Level: {item.level}</Text>
                  <Image style={styles.image} source={{uri: item.img}} alt=''/>     
              </View>    
          )
        }} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 50
  },
  title:{
    fontWeight:'bold',
    fontSize: 26,
    marginBottom: 5
  },
  search:{
    borderWidth: 1,
    borderRadius: 8,
    height: 30,
    width: 300,
    padding: 5,
    marginBottom: 15
  },
  menu:{
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 30,
    flexBasis: '46%',
    marginBottom: 10,
    marginLeft: 10
  },
  text:{
    fontSize: 18
  },
  image:{
    width: 125,
    height: 125
  }
});