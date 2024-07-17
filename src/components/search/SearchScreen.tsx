import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import searchQuery from '../../graphql/query/searchQuery.ts';
import {
  SearchQuery,
  SearchQuery_search,
  SearchQueryVariables,
} from '../../types/graphql.ts';

const SearchScreen = () => {
  const [term, setTerm] = React.useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({variables: {term}});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 50,
          width: '100%',
          paddingHorizontal: 16,
          // marginTop: 16,
          marginVertical: 16,
        }}>
        <TextInput
          style={s.input}
          placeholder="Search podcast"
          onChangeText={setTerm}
          autoCorrect={false}
          onSubmitEditing={onSearch}
          value={term}
        />
      </View>

      {error ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'red'}}>{error.message}</Text>
        </View>
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          style={s.listContentContainer}
          ListHeaderComponent={
            <>
              {loading && (
                <View style={{flex: 1, justifyContent: 'center', height: 300}}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              )}
            </>
          }
          ListEmptyComponent={
            <>
              {!loading && (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{color: 'grey'}}>
                    No Podcasts, Search for something...
                  </Text>
                </View>
              )}
            </>
          }
          data={data?.search ?? []}
          renderItem={({item}) => (
            <View
              style={{
                height: 90,
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
              }}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: 'blue',
                  borderRadius: 10,
                  marginRight: 10,
                }}>
                {item.thumbnail && (
                  <Image source={{uri: item.thumbnail}} style={s.img} />
                )}
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}} numberOfLines={1}>
                  {item.podcastName}
                </Text>
                <Text style={{fontSize: 12, color: 'grey'}}>{item.artist}</Text>
                <Text style={{fontSize: 12, color: 'blue'}}>
                  {item.episodesCount} epsodes
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.feedUrl}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  listContentContainer: {
    minHeight: '100%',
    paddingBottom: 90,
  },
  list: {
    minHeight: '100%',
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SearchScreen;
