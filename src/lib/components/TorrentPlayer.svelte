<script>
    import { onMount, onDestroy } from "svelte";

    let client;

    onMount(() => {
        // load module
        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
            import WebTorrent from "https://esm.sh/webtorrent";
            window.wt = WebTorrent;
            window.dispatchEvent(new Event("WebTorrentLoaded"));
        `;
        document.head.appendChild(script);

        function process(WebTorrent) {
            console.log("loaded");
            client = new WebTorrent();
            //const torrentId = "https://webtorrent.io/torrents/sintel.torrent";
            //const torrentId = "http://localhost:5173/test.torrent";
            const torrentId =
                "https://webtorrent.io/torrents/cosmos-laundromat.torrent";
            const player = document.querySelector("#output");

            function download() {
                client.add(torrentId, (torrent) => {
                    // Got torrent metadata!
                    console.log("Client is downloading:", torrent.infoHash);

                    const file = torrent.files.find((file) =>
                        file.name.endsWith(".mp4"),
                    );
                    file.on("stream", ({ stream, file, req }) => {
                        if (req.destination === "video") {
                            console.log(
                                `Video player requested data from ${file.name}! Ranges: ${req.headers.range}`,
                            );
                        }
                    });
                    // Stream to a <video> element by providing an the DOM element
                    file.streamTo(player);
                    //file.appendTo("#video");
                    console.log("Ready to play!");
                });
            }

            navigator.serviceWorker
                .register("./sw.min.js", { scope: "./" })
                .then((reg) => {
                    const worker = reg.active || reg.waiting || reg.installing;
                    function checkState(worker) {
                        return (
                            worker.state === "activated" &&
                            client.createServer({ controller: reg }) &&
                            download()
                        );
                    }
                    if (!checkState(worker)) {
                        worker.addEventListener("statechange", ({ target }) =>
                            checkState(target),
                        );
                    }
                });
        }

        if (window.wt) {
            process(window.wt);
        } else {
            window.addEventListener("WebTorrentLoaded", () =>
                process(window.wt),
            );
        }
    });

    onDestroy(() => {
        if (client) {
            console.log("client destroyed");
            client.destroy();
        }
        //navigator.serviceWorker.
    });
</script>

<div id="video"></div>

<video id="output" controls class="w-full" autoplay></video>
