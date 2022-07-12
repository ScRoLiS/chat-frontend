import { selectUser } from './../store/slices/app-slice';
import { useAppSelector } from './../store/hooks/index';

export const useAuth = () => {
    const user = useAppSelector(selectUser)
    return user.id ? true : false
}