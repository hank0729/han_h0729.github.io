var audio = document.getElementById("mp3");
        var playButton = document.getElementById("playButton");
        var restartButton = document.getElementById("restartButton");
        const lyric = [
            ["I saw you dancing in a crowded room", "我看見你在人群中跳舞"],
            ["You look so happy when I'm not with you", "我不在，你是多麽的自在"],
            ["But then you saw me, caught you by surprise", "但你突然注意到我，驚訝不已"],
            ["A single teardrop falling from your eye", "一滴眼淚從你的眼流下"],
            ["I don't know why I run away", "我不知道我爲何逃走"],
            ["I'll make you cry when I run away", "我的逃跑令你心碎"],
            ["You could've asked me why I broke your heart", "你可以問我，爲何令你心碎"],
            ["You could've told me that you fell apart", "你可以告訴我，你如何崩潰"],
            ["But you walked past me like I wasn't there", "但你擦身而過，裝作看不見我"],
            ["And just pretended like you didn't care", "假裝你毫不在意"],
            ["I don't know why I run away", "我不知道我爲何逃走"],
            ["I make you cry when I run away", "我的逃跑令你心碎"],
            ["Take me back 'cause I wanna stay", "和我復合吧，我想留下"],
            ["Save your tears for another", "把你的眼淚留給別的人"],
            ["Save your tears for another day", "把你的眼淚留給另一天"],
            ["Save your tears for another day", "把你的眼淚留給另一天"],
            ["So, I made you think that I would always stay", "我讓你以爲我會留下"],
            ["I said some things that I should never say", "我説了一些不該説的話"],
            ["Yeah, I broke your heart like someone did to mine", "我讓你心碎，像從前誰讓我心碎"],
            ["And now you won't love me for a second time", "你不會再給我第二次機會了"],
            ["I don't know why I run away, oh, girl", "我不知道我爲何逃走"],
            ["Said I make you cry when I run away", "我的逃跑令你心碎"],
            ["Girl, Take me back 'cause I wanna stay", "和我復合吧，我想留下"],
            ["Save your tears for another", "把你的眼淚留給別的人"],
            ["I realize that I'm much too late", "我發現一切都太遲了"],
            ["And you deserve someone better", "你值得擁有更好的"],
            ["Save your tears for another day", "把你的眼淚留給另一天"],
            ["Save your tears for another day", "把你的眼淚留給另一天"],
            ["I don't know why I run away", "我不知道我爲何逃走"],
            ["I make you cry when I run away", "我的逃跑令你心碎"],
            ["Save your tears for another day, ooh, girl (Ah)", "把你的眼淚留給另一天"],
            ["I said save your tears for another day (Ah)", "把你的眼淚留給另一天"],
            ["Save your tears for another day (Ah)", "把你的眼淚留給另一天"],
            ["Save your tears for another day (Ah)", "把你的眼淚留給另一天"]
        ];
        const lyricsContainers = [
            document.getElementById("lyricsContainer"),
            document.getElementById("lyricsContainer2"),
        ];
        let currentLyricIndex = 0;
        let currentContainerIndex = 0;

        playButton.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                playButton.innerHTML = "暫停";
                document.getElementById("video").style.opacity = "0.5";
                document.body.style.background = "white";
                fadeInNextLyric();
            } else {
                audio.pause();
                playButton.innerHTML = "播放";
                document.getElementById("video").style.opacity = "0";
                document.body.style.background = 'url("./static/error.png") no-repeat center center fixed';
                document.body.style.backgroundSize = "cover";
                resetLyrics();
            }
        });

        restartButton.addEventListener("click", function () {
            currentLyricIndex = 0;
            currentContainerIndex = 0;
            resetLyrics();
            fadeInNextLyric();
        });

        function resetLyrics() {
            lyricsContainers.forEach(container => {
                container.style.display = "none";
            });
        }

        function fadeInNextLyric() {
            const currentLyrics = lyricsContainers[currentContainerIndex].querySelectorAll("h1");

            if (currentLyricIndex < lyric.length) {
                fadeInLyric(currentLyrics);
            } else {
                lyricsContainers[currentContainerIndex].style.display = "none";

                currentLyricIndex = 0;

                currentContainerIndex = (currentContainerIndex + 1) % lyricsContainers.length;

                lyricsContainers[currentContainerIndex].style.display = "block";

                fadeInLyric(lyricsContainers[currentContainerIndex].querySelectorAll("h1"));
            }
        }

        function fadeInLyric(currentLyrics) {
            const englishLine = lyric[currentLyricIndex][0];
            const chineseLine = lyric[currentLyricIndex][1];

            currentLyrics[0].textContent = englishLine;
            currentLyrics[1].textContent = chineseLine;

            gsap.fromTo(currentLyrics[0], { opacity: 0 }, { opacity: 1, duration: 1 });
            gsap.fromTo(currentLyrics[1], { opacity: 0 }, { opacity: 1, duration: 1 });

            currentLyricIndex++;

            const randomDelay = Math.floor(Math.random() * 5000) + 1000;
            setTimeout(() => {
                gsap.fromTo(currentLyrics[0], { opacity: 1 }, { opacity: 0, duration: 1 });
                gsap.fromTo(currentLyrics[1], { opacity: 1 }, { opacity: 0, duration: 1 });

                if (currentLyricIndex < lyric.length) {
                    setTimeout(fadeInLyric, randomDelay, currentLyrics);
                } else {
                    setTimeout(fadeInNextLyric, randomDelay);
                }
            }, randomDelay);
        }