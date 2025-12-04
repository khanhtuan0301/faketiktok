import React, { useState } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic:
      "https://i.pinimg.com/736x/52/82/ea/5282ea1d4ede83b5f8f2f842073b476a.jpg",
    username: "MEME1",
    description: "ĐỔI AVT 1",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic: "https://i.pravatar.cc/150?img=5",
    username: "namuit",
    description: "ReactJS Lab 4 #uit",
    song:
      "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic: "https://i.pravatar.cc/150?img=7",
    username: "tiktok_fake",
    description: "Fake TikTok but real code 💻",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lăn chuột để chuyển video
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      // scroll xuống -> video tiếp theo
      setCurrentIndex((prev) =>
        prev < videoUrls.length - 1 ? prev + 1 : prev
      );
    } else if (e.deltaY < 0) {
      // scroll lên -> video trước
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const currentVideo = videoUrls[currentIndex];

  return (
    <div className="app" onWheel={handleWheel}>
      <div className="container">
        <TopNavbar className="top-navbar" />

        {/* Chỉ render 1 video tại 1 thời điểm */}
        <VideoCard
          username={currentVideo.username}
          description={currentVideo.description}
          song={currentVideo.song}
          likes={currentVideo.likes}
          saves={currentVideo.saves}
          comments={currentVideo.comments}
          shares={currentVideo.shares}
          url={currentVideo.url}
          profilePic={currentVideo.profilePic}
          autoplay={true}                 // luôn auto play video hiện tại
          setVideoRef={() => {}}          // không dùng nữa nên để hàm rỗng
          onProfileClick={() => {}}       // để khỏi lỗi prop
        />

        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
