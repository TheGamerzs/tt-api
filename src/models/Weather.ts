export interface Weather {
  hour: number;
  minute: number;
  time_remaining: number;
  current_weather: 'extrasunny' | 'clear' | 'neutral' | 'smog' | 'foggy' | 'overcast' | 'clouds' | 'clearing' | 'rain' | 'thunder' | 'snow' | 'blizzard' | 'snowlight' | 'xmas' | 'halloween';
}