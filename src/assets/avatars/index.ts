import { ReactComponent as Avatar0 } from './0.svg'
import { ReactComponent as Avatar1 } from './1.svg'
import { ReactComponent as Avatar2 } from './2.svg'
import { ReactComponent as Avatar3 } from './3.svg'
import { ReactComponent as Avatar4 } from './4.svg'
import { ReactComponent as Avatar5 } from './5.svg'

export const avatars = [Avatar0, Avatar1, Avatar2, Avatar3, Avatar4, Avatar5]
export const getAvatar = (avatar: number) => {
    return avatars[avatar]
}