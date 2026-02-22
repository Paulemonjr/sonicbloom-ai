import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_LIBRARY = [
  { id: 1, title: 'Morning Focus', mode: 'Focus', duration: '5:32', date: '2026-02-20', favorite: true },
  { id: 2, title: 'Deep Work Session', mode: 'Focus', duration: '25:00', date: '2026-02-19', favorite: false },
  { id: 3, title: 'Evening Unwind', mode: 'Relax', duration: '15:45', date: '2026-02-18', favorite: true },
  { id: 4, title: 'Sleep Journey', mode: 'Sleep', duration: '45:00', date: '2026-02-17', favorite: false },
  { id: 5, title: 'Jazz Focus', mode: 'Focus', duration: '10:15', date: '2026-02-16', favorite: true },
];

const TABS = ['All', 'Favorites', 'Focus', 'Relax', 'Sleep'];

export default function LibraryScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = MOCK_LIBRARY.filter(track => {
    const matchesTab = activeTab === 'All' || 
                      (activeTab === 'Favorites' ? track.favorite : track.mode === activeTab);
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderTrack = ({ item }) => (
    <TouchableOpacity
      style={styles.trackCard}
      onPress={() => navigation.navigate('Player', { track: item })}
    >
      <View style={styles.trackIcon}>
        <Ionicons name="musical-note" size={24} color="#6366f1" />
      </View>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackMeta}>{item.mode} • {item.duration}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons 
          name={item.favorite ? "heart" : "heart-outline"} 
          size={24} 
          color={item.favorite ? "#ef4444" : "#666"} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play-circle" size={32} color="#6366f1" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tracks..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={TABS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === item && styles.tabActive
              ]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[
                styles.tabText,
                activeTab === item && styles.tabTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Track List */}
      <FlatList
        data={filteredTracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrack}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="musical-notes" size={64} color="#333" />
            <Text style={styles.emptyText}>No tracks found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d44',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2d2d44',
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d44',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  trackIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  trackMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  favoriteButton: {
    padding: 8,
  },
  playButton: {
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 16,
  },
});
