# driving-instructor-app-

git clone https://github.com/YOUR_USERNAME/driving-instructor-app.git
cd driving-instructor-app

npx create-expo-app@latest app
# from repo root
cd app
rm -rf .git        # remove nested git if you ran `git init` inside /app
cd ..
git add app
git commit -m "Add Expo app scaffold"
git push

cd app
npm install @supabase/supabase-js react-native-url-polyfill expo-secure-store
npm start
