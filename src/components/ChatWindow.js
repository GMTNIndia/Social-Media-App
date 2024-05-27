import React, { useState, useEffect } from "react";
import img1 from "../components/images/img1.jpg";
import img2 from "../components/images/img2.jpg";
import img4 from "../components/images/img4.jpg";

// Utility function to calculate elapsed time
const getElapsedTime = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - timestamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

// Component to display each person in the list
function Person({ imgSrc, name, status, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex gap-5 justify-between mt-5 w-full cursor-pointer"
    >
      <div className="flex gap-2.5 text-xs font-medium text-neutral-900">
        <img
          loading="lazy"
          src={imgSrc}
          alt={name}
          className="shrink-0 w-8 aspect-square"
        />
        <div className="my-auto">{name}</div>
      </div>
      <div
        className={`my-auto text-xs font-semibold ${
          status === "Active Now" ? "text-green-500" : "text-zinc-600"
        }`}
      >
        {status}
      </div>
    </div>
  );
}

// Component to display each message
function Message({ imgSrc, message, time, isSender }) {
  return (
    <div
      className={`flex gap-4 items-start ${
        isSender ? "self-end" : "self-start"
      } mt-3`}
    >
      {!isSender && (
        <img
          loading="lazy"
          src={imgSrc}
          alt=""
          className="shrink-0 w-8 aspect-square"
        />
      )}
      <div className="flex flex-col grow shrink-0 mt-4 basis-0 w-fit">
        <div
          className={`justify-center px-5 py-2.5 text-xs leading-4 text-white ${
            isSender ? "bg-purple-600" : "bg-zinc-600"
          } rounded-xl shadow-sm`}
        >
          {message}
        </div>
        <div className="mt-1 text-xs text-zinc-600">{time}</div>
      </div>
      {isSender && (
        <img
          loading="lazy"
          src={imgSrc}
          alt=""
          className="shrink-0 w-8 aspect-square"
        />
      )}
    </div>
  );
}

function ChatPage() {
  // Initial people list
  const initialPeople = [
    {
      imgSrc:
        img1,
      name: "Ashok",
      status: "Active Now",
    },
    {
      imgSrc:
       img2,
      name: "Akash",
      status: "18 minutes ago",
    },
    {
      imgSrc:
        img4,
      name: "Bala",
      status: "28 minutes ago",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ac5d11a91c969ae029dea5880bb50e280eb991b013c193e707a42f2dd1adc3b5?apiKey=872d81e3538a4d4da9065221311f8faf&",
      name: "Code With Stein",
      status: "38 minutes ago",
    },
  ];

  // Initial messages list
  const initialMessages = [
    {
      imgSrc:
        img1,
      message:
        "Lorem ipsum dolor sit amet consectetur. Nec nulla nisl vitae tincidunt convallis sit velit aenean.",
      timestamp: new Date(),
      isSender: true,
      name: "Ashok",
    },
    {
      imgSrc:
        img1,
      message: "Lorem ipsum dolor sit amet",
      timestamp: new Date(),
      isSender: true,
      name: "Ashok",
    },
    {
      imgSrc:
        img4,
      message:
        "Lorem ipsum dolor sit amet consectetur. Nec nulla nisl vitae tincidunt convallis sit velit aenean.",
      timestamp: new Date(),
      isSender: false,
      name: "Bala",
    },
    {
      imgSrc:
        img4,
      message:
        "Lorem ipsum dolor sit amet consectetur. Nec nulla nisl vitae tincidunt convallis sit velit aenean.",
      timestamp: new Date(),
      isSender: false,
      name: "Bala",
    },
  ];

  const [people, setPeople] = useState(initialPeople);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(initialPeople[0]); // Default to the first person

  // Handle input change for the new message
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Handle form submission to add new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const newMsg = {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/78d58aeb4a28c9dfb67dc18b5f9b974caf5abd3d716733a130d97886d83a0250?apiKey=872d81e3538a4d4da9065221311f8faf&",
      message: newMessage,
      timestamp: new Date(),
      isSender: true,
      name: selectedPerson.name,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // Function to filter messages based on the selected person
  const filteredMessages = messages.filter(
    (msg) => msg.name === selectedPerson.name || msg.isSender
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({
          ...msg,
          time: getElapsedTime(msg.timestamp),
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPeople((prevPeople) =>
        prevPeople.map((person) => ({
          ...person,
          status: getElapsedTime(person.timestamp),
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  function updateStatusToActive(personName) {
    const updatedPeople = initialPeople.map((person) => {
      if (person.name === personName) {
        return { ...person, status: "Active Now" };
      } else {
        return person;
      }
    });
    return updatedPeople;
  }

  return (
    <div className="flex flex-col pb-20 bg-gray-100">
      <main className="flex flex-col self-center mt-9 w-full max-w-[1140px] max-md:max-w-full">
        <section className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <aside className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col px-4 py-5 mx-auto w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:mt-5">
                <div className="text-sm font-semibold text-neutral-900">
                  People
                </div>
                {people.map((person, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPerson(person)}
                    className={`cursor-pointer ${
                      selectedPerson && selectedPerson.name === person.name
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    <Person
                      imgSrc={person.imgSrc}
                      name={person.name}
                      status={person.status}
                    />
                  </div>
                ))}
              </div>
            </aside>
            <section className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-6 py-8 w-full font-semibold bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:px-5 max-md:mt-5 max-md:max-w-full">
                {filteredMessages.map((message, index) => (
                  <Message
                    key={index}
                    imgSrc={message.imgSrc}
                    message={message.message}
                    time={getElapsedTime(message.timestamp)}
                    isSender={message.isSender}
                  />
                ))}
              </div>
            </section>
          </div>
        </section>
        <section className="flex flex-col self-end px-6 py-5 mt-3.5 max-w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 w-[850px] max-md:px-5">
          <form onSubmit={handleSubmit}>
            <label htmlFor="messageInput" className="sr-only">
              What do you want to Say ?
            </label>
            <input
              type="text"
              id="messageInput"
              placeholder="What do you want to Say ?"
              aria-label="What do you want to Say ?"
              className="justify-center items-start p-3 text-xs font-medium rounded-md bg-zinc-200 text-zinc-500 max-md:pr-5 max-md:max-w-full w-full"
              value={newMessage}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="justify-center self-start px-5 py-4 mt-5 text-sm font-semibold text-gray-100 whitespace-nowrap bg-purple-600 rounded-md border border-gray-400 border-solid"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ChatPage;
