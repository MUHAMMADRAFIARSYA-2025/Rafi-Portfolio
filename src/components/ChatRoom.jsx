import React, { useState, useEffect, useRef } from 'react';
import { auth, db, loginWithGoogle, logout } from "../firebase"; 
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

// Icons
import { FcGoogle } from 'react-icons/fc';
import { IoMdSend } from 'react-icons/io';
import { BiLogOut, BiChat, BiTrash } from 'react-icons/bi'; 

const ChatRoom = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dummy = useRef(); 

  // 1. Cek User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // 2. Baca Pesan Realtime
  useEffect(() => {
    const q = query(collection(db, 'chat_messages'), orderBy('createdAt'));
    
    // PERBAIKAN: Jangan pakai scrollIntoView di dalam onSnapshot saat load awal
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
      // HAPUS setTimeout scrollIntoView di sini agar tidak melompat saat web dibuka
    });
    return unsubscribe;
  }, []);

  // 3. Fungsi Kirim Pesan
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const { uid, displayName, photoURL } = user;
    await addDoc(collection(db, 'chat_messages'), {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      photoURL
    });
    setNewMessage('');
    
    // SCROLL HANYA JALAN DI SINI (Saat user kirim pesan, baru layar geser ke bawah)
    setTimeout(() => {
        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Hapus pesan ini?")) {
      try {
        await deleteDoc(doc(db, "chat_messages", id));
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-5 px-2 bg-transparent font-sans">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
        {/* Header */}
        <div className="bg-[#242424] p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <BiChat className="text-blue-500"/> Global Chat
          </h2>
          {user && (
            <button onClick={logout} className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition-colors">
              Logout <BiLogOut />
            </button>
          )}
        </div>

        {!user ? (
          <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-4">
            <h3 className="text-white font-bold text-lg">Gabung Percakapan</h3>
            <button 
              onClick={loginWithGoogle}
              className="flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-lg"
            >
              <FcGoogle size={20} /> Login with Google
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a1a]">
              {messages.map((msg) => {
                const isMe = msg.uid === user.uid;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2 group`}>
                    {!isMe && <img src={msg.photoURL} className="w-6 h-6 rounded-full mb-1 border border-gray-600" alt="" />}
                    <div className="flex items-center gap-2">
                      {isMe && (
                        <button onClick={() => handleDeleteMessage(msg.id)} className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <BiTrash size={14} />
                        </button>
                      )}
                      <div className={`px-4 py-2 rounded-2xl max-w-[200px] text-sm break-words ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'}`}>
                        {!isMe && <p className="text-[10px] text-gray-400 mb-1 font-bold">{msg.displayName}</p>}
                        {msg.text}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={dummy}></div>
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-[#242424] flex gap-2 border-t border-gray-800">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-sm outline-none border border-gray-700"
              />
              <button type="submit" disabled={!newMessage} className="bg-blue-600 text-white p-2 rounded-full disabled:opacity-50">
                <IoMdSend size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;