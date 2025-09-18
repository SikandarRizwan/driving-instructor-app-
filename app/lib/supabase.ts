import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { supabase } from './lib/supabase';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [learners, setLearners] = useState<any[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <View style={{ padding: 24 }}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>Password</Text>
        <TextInput
          value={pass}
          onChangeText={setPass}
          secureTextEntry
          style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
        />
        <Button
          title="Sign up"
          onPress={async () => {
            const { data, error } = await supabase.auth.signUp({ email, password: pass });
            if (error) { console.error(error); return; }
            const user = data?.user;
            if (user) {
              await supabase.from('profiles').insert({
                auth_user_id: user.id, role: 'instructor', name: email.split('@')[0], email
              }).catch(console.error);
            }
          }}
        />
        <View style={{ height: 8 }} />
        <Button
          title="Sign in"
          onPress={() => supabase.auth.signInWithPassword({ email, password: pass })}
        />
      </View>
    );
  }

  const userId = session.user.id;

  async function fetchLearners() {
    const { data, error } = await supabase
      .from('learners')
      .select('*')
      .eq('instructor_auth_user_id', userId)
      .order('created_at', { ascending: false });
    if (!error) setLearners(data || []);
    else console.error(error);
  }

  useEffect(() => { fetchLearners(); }, []);

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Learners</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, padding: 8, flex: 1, marginRight: 8 }}
        />
        <Button
          title="Add"
          onPress={async () => {
            if (!name.trim()) return;
            await supabase.from('learners').insert({ instructor_auth_user_id: userId, name });
            setName('');
            fetchLearners();
          }}
        />
      </View>
      <FlatList
        data={learners}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <Text>- {item.name}</Text>}
      />
      <View style={{ height: 12 }} />
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
