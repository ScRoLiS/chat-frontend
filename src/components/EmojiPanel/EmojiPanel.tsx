import React, { MouseEvent } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { addEmoji } from '../../store/slices/message-input-slice'
import { getEmojis } from '../../utils/emoji-generator'
import { IconButton } from '../IconButton/IconButton'
import './EmojiPanel.scss'

export const EmojiPanel = () => {
    const emojis = getEmojis()
    const dispatch = useAppDispatch()

    return (
        <div className="emoji-panel">
            <div className="emoji-panel__list scrollbar" onClick={(e: MouseEvent) => {
                const element = e.target as HTMLElement
                if (element.classList.contains('icon-button'))
                    dispatch(addEmoji(element.innerText))
            }}>
                {emojis.map((item, index) => {
                    return (
                        <IconButton key={index}>{item}</IconButton>
                    )
                })}
            </div>
        </div>
    )
}
