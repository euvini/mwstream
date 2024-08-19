import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

export type StackParamList = {
    Home: undefined;
    Detail: { id: string, type: 'tv' | 'movie' };
    Search: { name: string };
    Movies: undefined;
};

export type DrawerParamList = {
    HomeDrawer: undefined;
    Movies: undefined;
};

export type StackNavigationProps<T extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, T>;

export type DrawerNavigationProps<T extends keyof DrawerParamList> = DrawerNavigationProp<DrawerParamList, T>;

export type StackRouteProps<T extends keyof StackParamList> = RouteProp<StackParamList, T>;