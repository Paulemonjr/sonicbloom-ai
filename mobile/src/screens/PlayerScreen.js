import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

// Audio player state
export default function PlayerScreen({ route, navigation }) {
  const { track } = route.params || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(180); // 3 minutes default
  const [volume, setVolume] = useState(0.8);
  const [isFavorite, setIsFavorite] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  const [isShuffle, setIsShuffle] = useState(false);

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setProgress(Math.min(progress + 15, duration));
  };

  const skipBackward = () => {
    setProgress(Math.max(progress - 15, 0));
  };

  const toggleRepeat = () => {
    const modes = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#6366f120', '#1a1a2e', '#1a1a2e']}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <View style={styles.artworkContainer}>
        <View style={styles.artwork}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6', '#6366f1']}
            style={styles.artworkGradient}
          >
            <Ionicons name="musical-notes" size={80} color="#fff" />
          </LinearGradient>
        </View>
      </View>

      {/* Track Info */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{track?.title || 'Focus Flow'}</Text>
        <Text style={styles.trackSubtitle}>
          {track?.mode || 'Focus'} • {track?.frequency || '40Hz'} Binaural
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={duration}
          value={progress}
          onValueChange={setProgress}
          minimumTrackTintColor="#6366f1"
          maximumTrackTintColor="#2d2d44"
          thumbTintColor="#6366f1"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.secondaryControl}
          onPress={() => setIsShuffle(!isShuffle)}
        >
          <Ionicons 
            name="shuffle" 
            size={24} 
            color={isShuffle ? "#6366f1" : "#666"} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryControl} onPress={skipBackward}>
          <Ionicons name="play-back" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.playButtonGradient}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={32} 
              color="#fff" 
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryControl} onPress={skipForward}>
          <Ionicons name="play-forward" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryControl}
          onPress={toggleRepeat}
        >
          <Ionicons 
            name={repeatMode === 'one' ? "repeat-once" : "repeat"} 
            size={24} 
            color={repeatMode !== 'off' ? "#6366f1" : "#666"} 
          />
        </TouchableOpacity>
      </View>

      {/* Volume & Actions */}
      <View style={styles.bottomSection}>
        {/* Volume */}
        <View style={styles.volumeContainer}>
          <Ionicons name="volume-low" size={20} color="#666" />
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor="#6366f1"
            maximumTrackTintColor="#2d2d44"
            thumbTintColor="#6366f1"
          />
          <Ionicons name="volume-high" size={20} color="#666" />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={28} 
              color={isFavorite ? "#ef4444" : "#fff"} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="list" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Binaural Info */}
      <View style={styles.binauralInfo}>
        <Ionicons name="pulse" size={16} color="#6366f1" />
        <Text style={styles.binauralText}>
          40Hz Gamma waves active • Enhanced focus mode
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  artworkContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  artwork: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  artworkGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  trackSubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeText: {
    color: '#888',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
  },
  secondaryControl: {
    padding: 10,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  playButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: 20,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 20,
  },
  actionButton: {
    padding: 10,
  },
  binauralInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  binauralText: {
    color: '#6366f1',
    fontSize: 12,
  },
});
