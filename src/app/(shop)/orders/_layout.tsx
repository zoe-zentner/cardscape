import { Stack } from 'expo-router';

export default function OrdersLayout() {
    return <Stack>
        <Stack.Screen 
            name='[slug]'
            options={{ headerShown: false, headerTitleAlign: 'center'}}  
        />
    </Stack>
}