import { ImageResponse } from 'next/og'
import data from './data.json'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: '24px',
          background: 'white', // Background color of the circle
          width: '100%',
          height: '100%',
          borderRadius: '50%', // Make it circular
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black', // Text color
          fontWeight: 'bold', // Make the text bold
        }}
      >
        {data.navbar.logo}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
