# driving-instructor-app

## Repo setup
bash
git clone https://github.com/YOUR_USERNAME/driving-instructor-app.git
cd driving-instructor-app
npx create-expo-app@latest app
cd app && rm -rf .git && cd ..
git add .
git commit -m "Add Expo app scaffold"
git push

cd app
npm install @supabase/supabase-js react-native-url-polyfill expo-secure-store
npm start
