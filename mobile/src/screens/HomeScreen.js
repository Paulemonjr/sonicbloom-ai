import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const QUICK_MODES = [
  { id: 'focus', name: 'Deep Focus', duration: '25 min', color: '#6366f1', icon: 'brain' },
  { id: 'relax', name: 'Unwind', duration: '15 min', color: '#10b981', icon: 'leaf' },
  { id: 'sleep', name: 'Sleep', duration: '45 min', color: '#8b5cf6', icon: 'moon' },
];

const RECENT_TRACKS = [
  { id: 1, title: 'Ambient Focus', mode: 'Focus', duration: '3:24', date: '2 hours ago' },
  { id: 2, title: 'Evening Calm', mode: 'Relax', duration: '5:12', date: 'Yesterday' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon,</Text>
            <Text style={styles.name}>Calixte</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Quick Modes */}
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickModesScroll}>
          {QUICK_MODES.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={styles.quickModeCard}
              onPress={() => navigation.navigate('Generate')}
            >
              <LinearGradient
                colors={[mode.color + '30', mode.color + '10']}
                style={styles.quickModeGradient}
              >
                <Ionicons name={mode.icon} size={28} color={mode.color} />
                <Text style={styles.quickModeName}>{mode.name}</Text>
                <Text style={styles.quickModeDuration}>{mode.duration}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Create New */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Generate')}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.createGradient}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.createText}>Create Custom Track</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Recent Tracks */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {RECENT_TRACKS.map((track) => (
            <TouchableOpacity
              key={track.id}
              style={styles.trackCard}
              onPress={() => navigation.navigate('Player', { track })}
            >
              <View style={styles.trackIcon}>
                <Ionicons name="musical-note" size={24} color="#6366f1" />
              </View>
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackMeta}>{track.mode} • {track.duration}</Text>
              </View>
              <Text style={styles.trackDate}>{track.date}</Text>
              <Ionicons name="play-circle" size={32} color="#6366f1" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Journey</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Tracks Created</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4.5h</Text>
              <Text style={styles.statLabel}>Listening Time</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#888',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  quickModesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickModeCard: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
  quickModeGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  quickModeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  quickModeDuration: {
    fontSize: 12,
    color: '#888',
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  createGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 8,
  },
  createText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#6366f1',
    fontSize: 14,
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
  trackDate: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2d2d44',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
});
