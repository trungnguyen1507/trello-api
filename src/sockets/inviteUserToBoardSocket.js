// Params socket lấy từ thư viện socket.io
export const inviteUserToBoardSocket = (socket) => {
  // Lắng nghe sự kiện mà Client emit lên
  socket.on('FE_USER_INVITED_TO_BOARD', (invitation) => {
    // Emit ngược lại sự kiện về cho mọi Client khác (ngoại trừ chính thằng đang gửi request), rồi để FE check
    socket.broadcast.emit('BE_USER_INVITED_TO_BOARD', invitation)
  })
}
