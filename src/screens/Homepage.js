import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Homepage = ({navigation}) => {
    const[movies, setMovies] = useState([])// 1. Initialize the state

    const getData = async () => {
        let url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
        const res = await axios.get(
            url,
            {
                headers: {
                    'Content-Type' : 'application/json',
                    'Content-Type' : "application/x-www-form-urlencoded",
                    'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTIwYTdjNDY2YWMyYWU3ZWQzYjVjYWFmYTMxNmMxYiIsInN1YiI6IjVmYzEyN2U4ZGQ5MjZhMDA0MDc4Y2RjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8gVNdIklxCXOgflvxC8XKn6gid7ALTZ4RNIKAap-BDg'
                }
            }
        )
        // console.log('data movie', res.data.results);
        setMovies(res.data.results)
    }

    useEffect(() =>{
        getData()
    },[])

    console.log('ini data state movie', movies);
  return (
        <View style={{flex: 1}}>
          {/* <TextInput
            placeholder="Search movie"
            value={search}
            onChangeText={(e) => setSearch(e)}
          /> */}
          {/* <TouchableOpacity
            onPress={async () => {
              setLoading(true);
              await axios
                .get(
                  `https://api.themoviedb.org/3/search/movie?api_key=570c36d75740509c00d865a804d826a5&language=en-US&page=1&query=${search}&include_adult=false`,
                )
                .then((e) => {
                  setMovies(e.data.results);
                  setLoading(false);
                  setSearch('');
                  navigation.navigate('Search', {
                    movie: movies,
                  });
                });
            }}>
            <Text>Submit</Text>
          </TouchableOpacity> */}
          <FlatList
            data={movies}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={(e) => {
              return (
                // console.log('ini data item', e.item),
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    borderWidth: 2,
                    borderColor: '#20cb9d',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    padding: 5,
                    elevation: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('Details', {movie_id: e.item.id});
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#4A90E2',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {e.item.title}
                    </Text>
                  </View>
                  <Image
                    style={{
                      height: Dimensions.get('screen').height * 0.15,
                      width: Dimensions.get('screen').height * 0.15,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${e.item.poster_path}`,
                    }}
                  />
                  <Text>Movie id:{e.item.id}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    }

export default Homepage