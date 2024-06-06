document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = new iro.ColorPicker('#colorPicker', {
        width: 300,
        layout: [
            {
                component: iro.ui.Box,
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: 'hue'
                }
            }
        ]
    });

    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');

    const hexCopyBtn = document.getElementById('hexCopyBtn');
    const rgbCopyBtn = document.getElementById('rgbCopyBtn');
    const hslCopyBtn = document.getElementById('hslCopyBtn');

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const updateColorValues = (color) => {
        hexValue.value = color.hexString;
        rgbValue.value = color.rgbString;
        hslValue.value = color.hslString;
    };

    colorPicker.on('color:change', (color) => {
        updateColorValues(color);
    });

    hexValue.addEventListener('input', (event) => {
        try {
            colorPicker.color.hexString = event.target.value;
        } catch (error) {
            console.error('Invalid HEX value');
        }
    });

    rgbValue.addEventListener('input', (event) => {
        try {
            const rgb = event.target.value.match(/\d+/g).map(Number);
            colorPicker.color.rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };
        } catch (error) {
            console.error('Invalid RGB value');
        }
    });

    hslValue.addEventListener('input', (event) => {
        try {
            const hsl = event.target.value.match(/\d+/g).map(Number);
            colorPicker.color.hsl = { h: hsl[0], s: hsl[1], l: hsl[2] };
        } catch (error) {
            console.error('Invalid HSL value');
        }
    });

    const copyToClipboard = (elementId, buttonId) => {
        const input = document.getElementById(elementId);
        input.select();
        document.execCommand('copy');
        const button = document.getElementById(buttonId);
        button.classList.add('copied');
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = '<i class="far fa-clipboard"></i>';
        }, 1000);
    };

    hexCopyBtn.addEventListener('click', () => copyToClipboard('hexValue', 'hexCopyBtn'));
    rgbCopyBtn.addEventListener('click', () => copyToClipboard('rgbValue', 'rgbCopyBtn'));
    hslCopyBtn.addEventListener('click', () => copyToClipboard('hslValue', 'hslCopyBtn'));

    // Initialize color values
    updateColorValues(colorPicker.color);

    // Theme toggle functionality
    const toggleTheme = () => {
        body.classList.toggle('dark-theme');
        saveThemePreference(body.classList.contains('dark-theme'));
        handleEasterEgg();
    };

    const saveThemePreference = (isDarkTheme) => {
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    };

    const loadThemePreference = () => {
        const preferredTheme = localStorage.getItem('theme');
        if (preferredTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-theme');
            themeToggle.checked = false;
        }
    };

    themeToggle.addEventListener('change', toggleTheme);

    // Load the user's preferred theme on page load
    loadThemePreference();

    // Easter Egg functionality
    let toggleCount = 0;
    const handleEasterEgg = () => {
        toggleCount++;
        if (toggleCount === 50) {
            body.classList.add('hidden-theme');
            const mainTitle = document.getElementById('mainTitle');
            mainTitle.textContent = 'Are you happy Maxeus?';
            alert('You found the hidden theme! Enjoy your melting eyes Maxeus!');
        }
    };

    window.addEventListener('beforeunload', () => {
        toggleCount = 0;
        body.classList.remove('hidden-theme');
    });
});