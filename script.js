// Select body
const body = document.body;

// apply some style on body
body.style.cssText = `
    padding: 1rem;
    margin: 0rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    min-height: 100vh;
`;


// Left section
const leftSection = document.createElement('div');
leftSection.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 50%;
`;
body.append(leftSection);

// Creating Image Element
const image = document.createElement('div');
image.style.cssText = `
    background-color: blue;
    width: 15rem;
    height: 15rem;
    border-radius: 0.5rem;
`;
leftSection.append(image);

// thumbnails data
const data = [
    {
        type: "blue",
        items : [
            {
                text: "1/5 - BLUE",
                color: "#00c3ff"
            },
            {
                text: "2/5 - BLUE",
                color: "#0084ff"
            },
            {
                text: "3/5 - BLUE",
                color: "#002fff"
            },
            {
                text: "4/5 - BLUE",
                color: "#003cff"
            },
            {
                text: "5/5 - BLUE",
                color: "#0051ff"
            }
        ]
    },
    {
        type: "red",
        items : [
            {
                text: "1/3 - RED",
                color: "#ff0000"
            },
            {
                text: "2/3 - RED",
                color: "#8b0501"
            },
            {
                text: "3/3 - RED",
                color: "#a13030"
            }
        ]
    },
    {
        type: "green",
        items : [
            {
                text: "1/4 - GREEN",
                color: "#c8ff00"
            },
            {
                text: "2/4 - GREEN",
                color: "#8ec200"
            },
            {
                text: "3/4 - GREEN",
                color: "#9dff00"
            },
            {
                text: "4/4 - GREEN",
                color: "#2bff00"
            }
        ]
    }
]

// Creating Thumbnails Container and element;
const thumbContainer = document.createElement('div');
thumbContainer.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100%;
`;
leftSection.append(thumbContainer)

// Dynamically Change thumbnails and image using ChangeThumbsDynamically
const ChangeThumbsDynamically = (select) => {
    let thumbnails = [];

    if (select && select !== "all") {
        thumbnails = data.filter(item => item.type === select)[0].items;
    }
    else {
        thumbnails = data.reduce((thumbs, items) => {
            return [...thumbs, ...items.items];
        }, [])
    }

    thumbContainer.innerHTML = '';

    thumbnails.forEach(item => {
        const thumb = document.createElement('div');
        thumb.textContent = item.text;
        thumb.style.cssText = `
            width: 5rem;
            height: 5rem;
            background-color: ${item.color};
            border-radius: 0.5rem;
            border: none;
            padding: 0.5rem
        `;

        thumbContainer.append(thumb);
    })

    thumbContainer.firstElementChild.style.border = '2px solid black';
    image.style.backgroundColor = thumbnails[0].color;
}

// Initial call for first time rendering
ChangeThumbsDynamically()


// Right section
const rightSection = document.createElement('div');
rightSection.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 50%;
`;
body.append(rightSection);

// Creating buttons
const btns = ['ALL', 'RED', "GREEN", "BLUE"];

const btnContainer = document.createElement('div');
rightSection.append(btnContainer);

btns.forEach(btnText => {
    const btn = document.createElement('button');
    btn.textContent = btnText;
    btn.style.cssText = `
        padding: 0.5rem 1rem;
    `;

    // Adding event listners for btn click
    btn.addEventListener('click', (e) => {
        ChangeThumbsDynamically(e.target.innerText.toLowerCase())
        dropDown.value = e.target.innerText.toUpperCase();
    })

    btnContainer.append(btn);
})

// Creating dropDown
const dropDown = document.createElement('select');
dropDown.style.cssText = `
    padding: 0.2rem 1rem;
    border: 1px solid gray;
    outline: none;
`;
rightSection.append(dropDown);

btns.forEach(btnText => {
    const option = document.createElement('option');
    option.textContent = btnText;

    dropDown.append(option)
})

// Adding event listener for changes
dropDown.addEventListener("change", (e) => {
    ChangeThumbsDynamically(e.target.value.toLowerCase());
})


// Making responsive for small device
const customMediaQuery = () => {
    const query = matchMedia("(max-width: 600px)");
    if (query.matches) {
        console.log("Working...")
        body.style.flexDirection = "column-reverse";
        body.style.gap = "2rem";
        body.style.padding = "2rem 1rem";
        body.style.justifyContent = 'flex-start';
        rightSection.style.minWidth = "100%";
        leftSection.style.minWidth = "100%";
    }
}

// automatically apply media query onload or resize page
onload = customMediaQuery;
onresize = customMediaQuery;