function showLoader(status) {
    const eventLoader = document.getElementById("events-loader")
    if (status) {
        eventLoader.style.display = "block"
        eventLoader.classList.add("active")
    } else {
        eventLoader.style.display = "none"
        eventLoader.classList.remove("active")
        eventLoader.remove()
    }
}

async function getCarouselItems() {
    const carouselContainer = document.querySelector(".carousel-inner-event")
    try {
        showLoader(true)

        const response = await fetch(
            "https://turtle-backend.onrender.com/all-posts"
        )

        const data = await response.json()

        showLoader(false)

        // console.log(data)

        data.data.forEach((element, index) => {
            // console.log(element.title)

            const carouselItem = document.createElement("div")
            carouselItem.classList.add("carousel-item")

            // Add 'active' class to the first item
            if (index === 0) {
                carouselItem.classList.add("active")
            }

            carouselItem.innerHTML = `
    ${
        element.isFile
            ? `
        <img
            class="d-block"
            src="${element.image}"
            alt="First slide"
            style="
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: 15px;
            "
        />
    `
            : `
        <iframe
            class="d-block"
            
            src="https://www.youtube.com/embed/${
                element.yt_link.split("v=")[1]
            }"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: 15px;
            "
        ></iframe>
    `
    }
    <!-- Event Info Overlay -->
    <div class="carousel-caption">
        <h5>${new Date(element.upcoming_date.toString()).toDateString()}</h5>
        <p>${element.title}</p>
        <p style="font-family: 'Montserrat', sans-serif; font-weight: 500;">
            ${element.content}
        </p>
    </div>
`

            carouselContainer.appendChild(carouselItem)
        })
    } catch (error) {
        console.log(error)
    }
}

getCarouselItems()

/* 
<div class="carousel-item active">
                            <img
                                class="d-block"
                                src="/images/home/party-1.jpg"
                                alt="First slide"
                                style="
                                    height: 100%;
                                    width: 100%;
                                    object-fit: cover;
                                    border-radius: 15px;
                                "
                            />
                            <!-- Event Info Overlay -->
                            <div class="carousel-caption">
                                <h5>12th Sept, 2024</h5>
                                <p>Turtles After Night</p>
                                <p>Progressive Techno, 6pm Onwards</p>
                            </div>
                        </div>
*/
