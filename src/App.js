import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

// Danh sách video gốc
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic:
      "https://i.pinimg.com/736x/52/82/ea/5282ea1d4ede83b5f8f2f842073b476a.jpg",
    username: "MEME1",
    description: "ĐỔI AVT 1 #funny #meme",
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
    description: "ReactJS Lab 4 #uit #react",
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
    description: "Fake TikTok but real code 💻 #coding #react",
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
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #codingmemes",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  // danh sách video đang hiển thị (sau filter hashtag)
  const [displayedVideos, setDisplayedVideos] = useState(videoUrls);
  const [currentIndex, setCurrentIndex] = useState(0);

  // overlay info (bước 5)
  const [showInfo, setShowInfo] = useState(false);
  const hideInfoTimeout = useRef(null);

  // search query để sync với TopNavbar
  const [searchQuery, setSearchQuery] = useState("");

  const currentVideo =
    displayedVideos.length > 0 ? displayedVideos[currentIndex] : null;

  // Hàm show upload info overlay 2.5s
  const triggerUploadInfo = () => {
    if (!currentVideo) return;
    setShowInfo(true);
    if (hideInfoTimeout.current) {
      clearTimeout(hideInfoTimeout.current);
    }
    hideInfoTimeout.current = setTimeout(() => {
      setShowInfo(false);
    }, 2500);
  };

  // 🔍 Tìm theo hashtag (gọi từ TopNavbar.onSearch)
  const handleSearchHashtag = (rawInput) => {
    const term = rawInput.trim();
    setSearchQuery(term);

    // nếu user xóa trắng và enter -> reset toàn bộ video
    if (!term) {
      setDisplayedVideos(videoUrls);
      setCurrentIndex(0);
      triggerUploadInfo();
      return;
    }

    // Chuẩn hóa: "react" -> "#react"
    const hashtag = term.startsWith("#")
      ? term.toLowerCase()
      : "#" + term.toLowerCase();

    const filtered = videoUrls.filter((video) =>
      video.description.toLowerCase().includes(hashtag)
    );

    if (filtered.length === 0) {
      // không có video nào: danh sách rỗng
      setDisplayedVideos([]);
      setCurrentIndex(0);
      setShowInfo(false);
    } else {
      setDisplayedVideos(filtered);
      setCurrentIndex(0);
      setShowInfo(true);
      if (hideInfoTimeout.current) {
        clearTimeout(hideInfoTimeout.current);
      }
      hideInfoTimeout.current = setTimeout(() => {
        setShowInfo(false);
      }, 2500);
    }
  };

  // Khi user bấm nút X đóng search -> clear filter
  const handleClearSearch = () => {
    setSearchQuery("");
    setDisplayedVideos(videoUrls);
    setCurrentIndex(0);
    setShowInfo(false);
  };

  // Lăn chuột để chuyển video (trong list đã filter)
  const handleWheel = (e) => {
    if (!displayedVideos.length) return;

    setCurrentIndex((prev) => {
      let next = prev;

      if (e.deltaY > 0 && prev < displayedVideos.length - 1) {
        next = prev + 1;
      } else if (e.deltaY < 0 && prev > 0) {
        next = prev - 1;
      }

      if (next !== prev) {
        triggerUploadInfo();
      }

      return next;
    });
  };

  // Nghe phím trái/phải để đổi video
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!displayedVideos.length) return;

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => {
          const next =
            prev < displayedVideos.length - 1 ? prev + 1 : prev;
          if (next !== prev) triggerUploadInfo();
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => {
          const next = prev > 0 ? prev - 1 : prev;
          if (next !== prev) triggerUploadInfo();
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedVideos.length, currentIndex, currentVideo]);

  return (
    <div className="app" onWheel={handleWheel}>
      <div className="container">
        <TopNavbar
          onSearch={handleSearchHashtag}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />

        {/* Overlay upload info */}
        {showInfo && currentVideo && (
          <div className="upload-info">
            <div className="upload-info__line upload-info__user">
              <span className="upload-info__label">Uploaded by</span>{" "}
              <span className="upload-info__value">
                @{currentVideo.username}
              </span>
            </div>
            <div className="upload-info__line upload-info__desc">
              <span className="upload-info__label">Caption:</span>{" "}
              <span className="upload-info__value">
                {currentVideo.description}
              </span>
            </div>
            <div className="upload-info__line">
              <span className="upload-info__label">Song:</span>{" "}
              <span className="upload-info__value">
                {currentVideo.song}
              </span>
            </div>
            <div className="upload-info__line">
              <span className="upload-info__value">
                ❤️ {currentVideo.likes} · 💬 {currentVideo.comments} · 🔁{" "}
                {currentVideo.shares}
              </span>
            </div>
          </div>
        )}

        {/* Không có video phù hợp hashtag */}
        {!displayedVideos.length && (
          <div className="no-results">
            <p>No videos found for this hashtag.</p>
            <p>Try another one or clear search.</p>
          </div>
        )}

        {/* Video hiện tại */}
        {currentVideo && (
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
            autoplay={true}
            setVideoRef={() => {}}
            onProfileClick={() => {}}
          />
        )}

        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
