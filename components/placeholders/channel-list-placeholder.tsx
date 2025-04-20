'use client'

export const ChannelListPlaceholder: React.FC = () => {
  return (
    <div
      role='status'
      className='animate-pulse mt-1'
    >
      <div className='w-full h-14 flex items-center justify-between p-4'>
        <div className='w-28 h-10 bg-gray-600 rounded-md'></div>
        <div className='w-24 h-10 bg-gray-600 rounded-md'></div>
      </div>
      <div
        className='flex flex-col gap-4 p-4'
        role='listbox'
      >
        {[1, 2, 3].map(item => (
          <div key={item} className='h-16 w-full rounded-md bg-gray-600' />
        ))}
      </div>
    </div>
  )
}
