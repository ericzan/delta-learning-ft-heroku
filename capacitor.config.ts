import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'DT-ONE',
  webDir: 'dist/delta-learning-ft',
  server: {
    androidScheme: 'https'
  }
};

export default config;
