import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoIosDocument } from "react-icons/io";
import FileUploadModel from "../employee/FileUploadModel";
import { BASE_URL } from "../../constants";

function BillingTeamChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const loggedInUserId = localStorage.getItem("CurrentUserId");
  const [recipient, setRecipient] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [sender, setSender] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const [admins, setAdmins] = useState([]);

  const handleClick = (id, name) => {
    console.log("handleClick", id, name);
    setSender(loggedInUserId);
    setRecipient(id);
    setRecipientName(name);
    fetchMessages(loggedInUserId, id);
  };

  const fetchMessages = (sender, recipient) => {
    axios
      .get(`${BASE_URL}/api/getmessages/${recipient}/${sender}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/manager/getAllManagers`)
      .then((response) => {
        console.log("getAllManagers", response.data);
        const filteredUsers = response.data.filter(
          (user) => user._id !== loggedInUserId
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loggedInUserId]);

  useEffect(() => {
    if (sender && recipient) {
      fetchMessages(sender, recipient);
    }
  }, [sender, recipient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !attachment) return;

    const messageData = {
      sender: loggedInUserId,
      recipient: recipient,
      text: newMessage,
      image: attachment?.type.startsWith("image/") ? attachment.url : null,
      document: attachment?.type.startsWith("application/")
        ? attachment.url
        : null,
      video: attachment?.type.startsWith("video/") ? attachment.url : null,
    };

    axios
      .post(`${BASE_URL}/api/postmessages`, messageData)
      .then((response) => {
        setMessages([...messages, response.data.data]);
        setNewMessage("");
        setAttachment(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachment({
          url: reader.result,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.manager_name?.toLowerCase().includes(userSearchQuery?.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">All Manager</h1>
        <div className="relative mb-4">
          <input
            type="text"
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            className="w-4/5 p-2 text-sm text-gray-700 bg-gray-200 rounded pl-10"
            placeholder="Search by name..."
          />
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" />
        </div>
        <div className="h-[90%] overflow-y-auto">
          {filteredUsers.map((user) => (
            <div key={user._id}>
              <div
                className="w-full h-14 font-medium rounded-md bg-indigo-200 mb-4 text-2xl flex items-center p-4 cursor-pointer"
                onClick={() => handleClick(user._id, user.manager_name)}
              >
                {user.manager_name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-4/5 p-4">
        <div className="flex justify-between items-center content-center mb-4">
          <h1 className="text-2xl font-bold">Chat with {recipientName}</h1>
          <Link
            to={"/"}
            className="group relative flex items-center justify-end font-extrabold text-2xl rounded-full p-3 md:p-5"
          >
            <BiLogOut />
          </Link>
        </div>
        <div className="flex flex-col h-4/5 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-md mb-2 max-w-xs ${
                message.sender === loggedInUserId
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {message.content && message.content.text && (
                <p className="text-sm">{message.content.text}</p>
              )}
              {message.content && message.content.image && (
                <img
                  src={message.content.image}
                  alt="Image"
                  className="max-w-xs"
                />
              )}
              {message.content && message.content.document && (
                <a
                  href={message.content.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <IoIosDocument className="text-2xl" />
                </a>
              )}
              {message.content && message.content.video && (
                <video controls className="max-w-xs">
                  <source src={message.content.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <span className="text-xs text-gray-500 block">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex justify-center items-center w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 bg-gray-200"
            placeholder="Type a message..."
          />
          <input
            type="file"
            onChange={handleAttachmentChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer p-2">
            <span className="bg-gray-200 hover:bg-gray-300 p-2 rounded">
              Attach
            </span>
          </label>
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Send
          </button>
          <FileUploadModel sender={loggedInUserId} recipient={recipient} />
        </div>
      </div>
    </div>
  );
}

export default BillingTeamChat;
