export interface Weather {
  hour: number;
  minute: number;
  time_remaining: number;
  current_weather: 'extra sunny' | 'clear' | 'neutral' | 'smoggy' | 'foggy' | 'overcast' | 'cloudy' | 'drizzling' | 'rainy' | 'stormy' | 'snowy' | 'blizzardy' | 'drizzling snow' | 'cold' | 'spooky';
}