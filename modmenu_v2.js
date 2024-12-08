(function () {
    let isMenuOpen = true;
    if (isMenuOpen) {
        const shadowHost = document.createElement('div');
        shadowHost.style.position = 'fixed';
        shadowHost.style.bottom = '20px';
        shadowHost.style.right = '20px';
        shadowHost.style.zIndex = '9999';
        shadowHost.style.userSelect = 'none'; 
        const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
        let startX, startY;
    
            const modMenuIconImg = `data:image/png;base64,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`
        const canvas = document.querySelector('#content canvas'); 
        const canvasRect = canvas.getBoundingClientRect();
        document.body.appendChild(shadowHost);
    
        let isDarkTheme = false;
        let inSettings = false;
        let isDragging = false;
        let wasDragging = false;
        const modMenuIcon = document.createElement('div');
        Object.assign(modMenuIcon.style, {
            position: 'fixed',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
        });
        modMenuIcon.innerHTML = `<img src="${modMenuIconImg}" alt="icon" draggable="false" style="width: 100%; height: 100%; border-radius: 50%;">`;
        shadowRoot.appendChild(modMenuIcon);
        const modMenuContainer = document.createElement('div');
        Object.assign(modMenuContainer.style, {
            position: 'fixed',
            width: '280px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            display: 'none',
            transition: 'opacity 0.3s ease',
            opacity: '0',
            userSelect: 'none',
        });
        modMenuContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 id="menuTitle" style="margin: 0; font-size: 18px;">Mod Menu</h3>
            <button id="closeModMenu" style="background: none; border: none; font-size: 18px; color: #888; cursor: pointer;">✖</button>
        </div>
        <hr style="margin: 10px 0; border-color: #eee;">
    
        <!-- Accordion Container -->
        <div id="accordionContainer" class="containerDiv">
            <div class="accordion-item">
                <button class="accordion-header">Gameplay</button>
                <ul class="accordion-content" id="gameplayOptions"></ul>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">Resources</button>
                <ul class="accordion-content" id="resourceOptions"></ul>
            </div>
            <div class="accordion-item">
                <button class="accordion-header" id="editMonstersHeader">Edit Monsters</button>
                <ul class="accordion-content" id="editMonstersOptions">
                    <li>
                        <button id="editMonstersBtn" class="btn">Edit Monsters</button>
                    </li>
                </ul>
            </div>
            <div class="accordion-item">
        <button class="accordion-header" id="editItemsHeader">Edit Items</button>
        <ul class="accordion-content" id="editItemsOptions">
            <li>
                <button id="editItemsBtn" class="btn">Edit Items</button>
            </li>
        </ul>
    </div>
        </div>
    
    <div id="monsterEditForm" style="display: none; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;" class="containerDiv">
        <!-- Dropdown Monster -->
        <div id="customDropdown" style="margin-bottom: 20px;">
            <div id="monsterDropdown" class="dropdown" style="display: flex; align-items: center; gap: 10px;">
                <img id="dropdownIcon" src="" alt="Icon" style="width: 50px; height: 50px; border-radius: 8px; border: 1px solid #ccc;">
                <div>
                    <button id="dropdownBtn" class="btn" style="background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 5px; padding: 5px 10px; cursor: pointer; text-align: left;">
                        <span id="dropdownName" style="font-weight: bold;">Monster 1</span>
                    </button>
                    <div id="dropdownMenu" class="dropdown-menu" style="margin-top: 5px;"></div>
                </div>
            </div>
        </div>
    
        <!-- Monster Details -->
        <div id="monsterEditorContainer"></div>
    
        <!-- Action Buttons -->
        <div style="margin-top: 20px;">
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between;">
                <button id="saveMonsterBtn" class="btn btn-primary" style="flex: 1;">Save</button>
                <button id="addMonsterBtn" class="btn btn-secondary" style="flex: 1;">Add</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; margin-top: 10px;">
                <button id="removeMonsterBtn" class="btn btn-danger" style="flex: 1;">Remove</button>
                <button id="backToAccordionBtn" class="btn btn-light" style="flex: 1;">Back</button>
            </div>
        </div>
    </div>
    
    <div id="itemContainer" style="display: flex; flex-direction: column; gap: 15px;"></div>
    
        <div id="settingsOptions" style="display: none;" class="containerDiv">
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li>
                    <label class="option-label">Dark Theme</label>
                    <label class="switch-container">
                        <input type="checkbox" id="themeToggleSwitch" class="toggle-switch">
                        <span class="slider"></span>
                    </label>
                </li>
                <li>
                    <button id="resetSettingsBtn" class="btn">Reset Settings</button>
                </li>
                <li>
                    <button id="killBtn" class="btn">Kill</button>
                </li>
            </ul>
        </div>
        <!-- Toast Message -->
    <div id="toastMessage" style="position: fixed; bottom: 20px; right: 20px; background: #000; color: #fff; padding: 10px 20px; border-radius: 4px; display: none; z-index: 999;">
        <!-- Nội dung thông báo -->
    </div>
    
    
    `;
    const accordionHeaders = modMenuContainer.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
        });
    });
    
        shadowRoot.appendChild(modMenuContainer);
    
        function createOption(type, label, options = {}, callbackOrCode = () => {}) {
            const optionItem = document.createElement('li');
            optionItem.classList.add('option-item');
        
            const labelEl = document.createElement('label');
            labelEl.classList.add('option-label');
            labelEl.textContent = label;
        
            let inputEl;
            let resetBtn;
            const callback = typeof callbackOrCode === 'string' ? (value) => {
                const code = callbackOrCode.replace(/\${value}/g, value);
                runGameCode(code);
            } : callbackOrCode;
        
            const processValue = typeof options.value === 'string' ? () => {
                return runGameCode(options.value);
            } : () => options.value || 50;
        
            switch (type) {
                case 'toggle':
                    inputEl = document.createElement('label');
                    inputEl.classList.add('switch-container');
                    inputEl.innerHTML = `
                        <input type="checkbox" class="toggle-switch" ${options.checked ? 'checked' : ''}>
                        <span class="slider"></span>
                    `;
                    inputEl.querySelector('input').addEventListener('change', (e) => {
                        callback(e.target.checked);
                    });
        
                    optionItem.appendChild(labelEl);
                    optionItem.appendChild(inputEl);
                    break;
        
                case 'range':
                    inputEl = document.createElement('input');
                    inputEl.type = 'range';
                    inputEl.classList.add('option-range');
                    inputEl.value = processValue();
                    inputEl.min = options.min || 0;
                    inputEl.max = options.max || 100;
        
                    resetBtn = document.createElement('button');
                    resetBtn.textContent = 'Reset';
                    resetBtn.classList.add('reset-btn');
                    resetBtn.addEventListener('click', () => {
                        inputEl.value = options.resetValue || 50;
                        callback(inputEl.value);
                    });
        
                    inputEl.addEventListener('input', (e) => {
                        callback(e.target.value);
                    });
        
                    optionItem.appendChild(labelEl);
                    optionItem.appendChild(inputEl);
                    optionItem.appendChild(resetBtn);
                    break;
        
                case "input":
                    inputEl = document.createElement('input');
                    inputEl.type = options.type || 'number';
                    inputEl.classList.add('option-input');
                    inputEl.value = processValue();
                
                    resetBtn = document.createElement('button');
                    resetBtn.textContent = 'Reset';
                    resetBtn.classList.add('reset-btn');
                    resetBtn.addEventListener('click', () => {
                        inputEl.value = options.resetValue || (options.type === 'text' ? '' : 10);
                        callback(inputEl.value);
                    });
                
                    inputEl.addEventListener('input', (e) => {
                        callback(e.target.value);
                    });
                
                    optionItem.appendChild(labelEl);
                    optionItem.appendChild(inputEl);
                    optionItem.appendChild(resetBtn);
                    break;
        
                case "select":
                    inputEl = document.createElement('select');
                    inputEl.classList.add('option-select');
        
                    // Tìm giá trị mặc định từ choices
                    const defaultChoice = (options.choices || []).find(choice => choice.value === options.value) || options.choices[0];
        
                    // Thêm các lựa chọn (options)
                    (options.choices || []).forEach(choice => {
                        const optionEl = document.createElement('option');
                        optionEl.value = choice.value;
                        optionEl.textContent = choice.label;
                        inputEl.appendChild(optionEl);
                    });
        
                    // Đặt giá trị mặc định
                    inputEl.value = defaultChoice?.value || "";
        
                    // Nhãn hiển thị giá trị được chọn
                    const selectedLabel = document.createElement('span');
                    selectedLabel.classList.add('selected-label');
                    selectedLabel.textContent = defaultChoice?.label || "";
        
                    // Thêm sự kiện khi thay đổi lựa chọn
                    inputEl.addEventListener('change', (e) => {
                        const selectedOption = options.choices.find(choice => choice.value === e.target.value);
                        selectedLabel.textContent = selectedOption?.label || "";
                        callback(e.target.value);
                    });
        
                    optionItem.appendChild(labelEl);
                    optionItem.appendChild(inputEl);
                    optionItem.appendChild(selectedLabel);
                    break;
        
                default:
                    console.error('Invalid option type');
                    return null;
            }
        
            return optionItem;
        }
        
        
    
        const gameplayOptions = shadowRoot.getElementById('gameplayOptions');
        const resourceOptions = shadowRoot.getElementById('resourceOptions');
        const toggleGodMode = createOption('toggle', 'God Mode', { checked: false }, (value) => {
            console.log(value ? 'God Mode ON' : 'God Mode OFF');
        });
        const damageInput = createOption('input', 'Damage', { value: 10, resetValue: 10 }, (value) => {
            console.log('Damage set to:', value);
        });
        gameplayOptions.appendChild(toggleGodMode);
        gameplayOptions.appendChild(damageInput);
        const moneyRange = createOption('range', 'Money', { value: 50, min: 0, max: 10000, resetValue: 5000 }, (value) => {
            console.log('Money set to:', value);
        });
    
        const coinsInput = createOption('input', 'Coins', { value: `u.getPlayerCoins()`, resetValue: 1e5 }, 'u.setPlayerCoins(${value})');
    
        const shardInput = createOption('input', 'Shards', { value: `u.getPlayerDust()`, resetValue: 1e5 }, 'u.setPlayerDust(${value})');
        resourceOptions.appendChild(moneyRange);
        resourceOptions.appendChild(coinsInput);
        resourceOptions.appendChild(shardInput);
    
        const accordionContainer = modMenuContainer.querySelector('#accordionContainer');
        const monsterEditForm = modMenuContainer.querySelector('#monsterEditForm');
        const dropdownBtn = shadowRoot.getElementById('dropdownBtn');
        const dropdownMenu = shadowRoot.getElementById('dropdownMenu');
        const dropdownIcon = shadowRoot.getElementById('dropdownIcon');
        const dropdownName = shadowRoot.getElementById('dropdownName');
        let currentMonsterIndex = 0;
        let currentMonsterUID = null;
    function getParty() {
        return runGameCode("u._party");
    }
    
    function getMonsterByUID(uid) {
        const party = getParty();
        return party.find(monster => monster._uid === uid);
    }
    
    function updateMonsterValue(uid, key, value) {
        const party = getParty();
        const monsterIndex = party.findIndex(monster => monster._uid === uid);
    
        if (monsterIndex === -1) {
            console.error(`Monster with UID ${uid} not found.`);
            return;
        }
    
        runGameCode(`u._party[${monsterIndex}].${key} = ${value}`);
    }
    
    
    function loadMonster(uid) {
        const monster = getMonsterByUID(uid);
    
        if (!monster) {
            console.error(`Monster with UID ${uid} not found.`);
            return;
        }
    
        dropdownIcon.src = `images/general/mons/${monster._id}/icon.png`;
        dropdownName.textContent = `${monster._data.title} (Lv ${monster._level})`;
    
        const editorContainer = shadowRoot.getElementById("monsterEditorContainer");
        editorContainer.innerHTML = ""; // Clear editor
        editorContainer.appendChild(setupMonsterEditor(monster._uid)); // Truyền UID thay vì index
    
        currentMonsterUID = uid; // Lưu UID của monster hiện tại
    }
    
    
    function saveMonster() {
        console.log(`Monster ${currentMonsterIndex + 1} Updated:`, getParty()[currentMonsterIndex]);
        populateDropdown();
    }
    
    function populateDropdown() {
        dropdownMenu.innerHTML = ""; // Clear menu
    
        const party = getParty();
    
        if (party.length > 0) {
            currentMonsterUID = party[0]._uid; // Lưu UID của monster đầu tiên vào biến toàn cục
        } else {
            currentMonsterUID = null; // Nếu không có monster, gán null
        }
    
        party.forEach(monster => {
            const item = document.createElement("div");
            item.classList.add("dropdown-item");
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.setAttribute("data-monster-uid", monster._uid); // Gắn UID để xác định monster này
    
            const monsterUID = monster._uid; // Lưu UID để sử dụng cho cập nhật
    
            item.innerHTML = `
                <img src="images/general/mons/${monster._id}/icon.png" alt="${monster._id}" 
                     style="width: 40px; height: 40px; margin-right: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <span>${monster._data.title} (Lv ${monster._level})</span>
            `;
    
            item.addEventListener("click", () => {
                loadMonster(monsterUID); // Tải thông tin monster vào editor
                dropdownMenu.classList.remove("active");
                currentMonsterUID = monsterUID; // Cập nhật UID hiện tại khi chọn monster
            });
    
            // Theo dõi và cập nhật trực tiếp nếu dữ liệu thay đổi
            setInterval(() => {
                const currentMonster = getMonsterByUID(monsterUID); // Lấy monster mới nhất từ UID
                if (!currentMonster) return; // Nếu monster không tồn tại, thoát sớm
    
                const updatedTitle = `${currentMonster._data.title} (Lv ${currentMonster._level})`;
                const titleElement = item.querySelector("span");
    
                // Cập nhật chỉ khi có sự thay đổi
                if (titleElement.textContent !== updatedTitle) {
                    titleElement.textContent = updatedTitle;
                }
            }, 500); // Kiểm tra và cập nhật mỗi 500ms
    
            dropdownMenu.appendChild(item);
        });
    }
    
    function createMonsterEditor(uid, key, label, resetValue, isDependentOnLevel = false, isDropdown = false, choices = []) {
        const optionType = isDropdown ? "select" : "input"; // Quyết định kiểu option
        const inputType = typeof resetValue === "string" ? "text" : "number"; // Loại input cho text/number
    
        const optionItem = createOption(
            optionType,
            label,
            {
                value: `u._party.find(m => m._uid === ${uid}).${key}`,
                resetValue,
                type: isDropdown ? undefined : inputType, // Bỏ type nếu là dropdown
                choices: isDropdown ? choices : undefined // Truyền danh sách lựa chọn nếu là dropdown
            },
            (newValue) => {
                // Xử lý logic cho từng loại input
                if (isDropdown) {
                    // Dropdown luôn là chuỗi
                    runGameCode(`u._party.find(m => m._uid === ${uid}).setState('${newValue}')`);
                } else if (typeof resetValue === "string") {
                    runGameCode(`u._party.find(m => m._uid === ${uid}).${key} = '${newValue}'`);
                } else if (key === "_hpCurr") {
                    runGameCode(`u._party.find(m => m._uid === ${uid}).setCurrHP(${newValue})`);
                } else {
                    runGameCode(`u._party.find(m => m._uid === ${uid}).${key} = ${newValue}`);
                    if (key === "_level") {
                        runGameCode(`u._party.find(m => m._uid === ${uid}).dispatchEvent(new ea("ShowLevelupEvent"))`)
                    }
                }
            }
        );
    
        // Lấy phần tử input hoặc select từ optionItem
        const inputEl = optionItem.querySelector(isDropdown ? ".option-select" : ".option-input");
    
        if (!isDropdown) {
            let isFocused = false;
            let lastKnownLevel = null;
    
            function updateValue() {
                if (isFocused) return;
    
                const monster = getMonsterByUID(uid);
                if (!monster) return;
    
                if (isDependentOnLevel) {
                    const currentLevel = monster._level;
    
                    if (currentLevel !== lastKnownLevel) {
                        lastKnownLevel = currentLevel;
                        const levelIndex = currentLevel - 1;
                        const dependentValue = runGameCode(
                            `u._party.find(m => m._uid === ${uid})._data.lvlTable[${levelIndex}]?.${key.split(".").pop()}`
                        );
                        inputEl.value = dependentValue || 0;
                    }
                } else {
                    const currentValue = runGameCode(`u._party.find(m => m._uid === ${uid}).${key}`);
                    inputEl.value = currentValue;
                }
            }
    
            inputEl.addEventListener("focus", () => {
                isFocused = true;
            });
    
            inputEl.addEventListener("blur", () => {
                isFocused = false;
                const newValue = typeof resetValue === "string" ? inputEl.value : parseFloat(inputEl.value);
                if (typeof resetValue === "string") {
                    runGameCode(`u._party.find(m => m._uid === ${uid}).${key} = '${newValue}'`);
                } else if (key === "_hpCurr") {
                    runGameCode(`u._party.find(m => m._uid === ${uid}).setCurrHP(${newValue})`);
                } else {
                    runGameCode(`u._party.find(m => m._uid === ${uid}).${key} = ${newValue}`);
                }
            });
    
            setInterval(updateValue, 500);
        }
    
        if (isDropdown) {
            const inputEl = optionItem.querySelector('.option-select');
            setInterval(() => {
                const monster = getMonsterByUID(uid);
                if (!monster) return;
    
                const currentValue = monster._hasState;
                if (inputEl.value !== currentValue) {
                    inputEl.value = currentValue;
                    const selectedOption = choices.find(choice => choice.value === currentValue);
                    const selectedLabel = optionItem.querySelector('.selected-label');
                    selectedLabel.textContent = selectedOption?.label || "None";
                }
            }, 500);
        }
    
        return optionItem;
    }
    
    
    function setupMonsterEditor(uid) {
        const monster = getMonsterByUID(uid);
        if (!monster) {
            console.error(`Monster with UID ${uid} not found.`);
            return;
        }
    
        const container = document.createElement("div");
    
        // Tạo các input thường
        container.appendChild(createMonsterEditor(uid, "_data.title", "Name", monster._data.title));
        container.appendChild(createMonsterEditor(uid, "_id", "ID", monster._id));
        container.appendChild(createMonsterEditor(uid, "_level", "Level", monster._level));
        container.appendChild(createMonsterEditor(uid, "_hpCurr", "Current HP", monster._hpCurr));
        container.appendChild(createMonsterEditor(uid, "_hpMax", "Max HP", monster._hpMax));
        container.appendChild(createMonsterEditor(uid, "_currXP", "Current XP", monster._currXP));
        container.appendChild(createMonsterEditor(uid, "_targetXP", "Target XP", monster._targetXP));
    
        // Tạo dropdown chọn loại monster
        const stateData = [
            { value: "none", label: "None" },
            { value: "sick", label: "Sick" },
            { value: "hypno", label: "Hypno" },
            { value: "rage", label: "Rage" }
        ];
        container.appendChild(createMonsterEditor(uid, "_hasState", "State", monster._hasState || "", false, true, stateData));
    
        // Tạo các input phụ thuộc vào level
        const levelIndex = monster._level - 1;
        container.appendChild(
            createMonsterEditor(uid, `_data.lvlTable[${levelIndex}].atk`, "Attack", monster._data.lvlTable[levelIndex]?.atk || 0, true)
        );
        container.appendChild(
            createMonsterEditor(uid, `_data.lvlTable[${levelIndex}].def`, "Defense", monster._data.lvlTable[levelIndex]?.def || 0, true)
        );
        container.appendChild(
            createMonsterEditor(uid, `_data.lvlTable[${levelIndex}].aim`, "Aiming", monster._data.lvlTable[levelIndex]?.aim || 0, true)
        );
    
        // Tạo các input khác
        container.appendChild(createMonsterEditor(uid, "_statDeltas.h.atk", "Atk Stat", monster._statDeltas.h.atk));
        container.appendChild(createMonsterEditor(uid, "_statDeltas.h.def", "Def Stat", monster._statDeltas.h.def));
        container.appendChild(createMonsterEditor(uid, "_statDeltas.h.aim", "Aim Stat", monster._statDeltas.h.aim));
    
        return container;
    }
    
    
        shadowRoot.getElementById("saveMonsterBtn").addEventListener("click", saveMonster);    
        shadowRoot.getElementById('editMonstersBtn').addEventListener('click', () => {
            accordionContainer.style.display = 'none';
            monsterEditForm.style.display = 'block';
            populateDropdown();
            loadMonster(currentMonsterUID);
        });
        dropdownBtn.addEventListener('click', () => {
            dropdownMenu.classList.toggle('active');
        });
        shadowRoot.getElementById('backToAccordionBtn').addEventListener('click', () => {
            accordionContainer.style.display = 'block';
            monsterEditForm.style.display = 'none';
        });
        
        const editItemsBtn = shadowRoot.getElementById('editItemsBtn');
        function createContainer({
            containerId,
            maxHeight = "200px",
            backgroundColor = "#f9f9f9",
            items = [],
            searchPlaceholder = "Search items...",
        }) {
            const container = shadowRoot.getElementById(containerId);
                container.style.cssText = `
                    display: none;
                    max-height: ${maxHeight};
                    overflow-y: auto; padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: ${backgroundColor};
                `;
                const searchBox = document.createElement('div');
                searchBox.style.cssText = `
                    margin-bottom: 20px;
                    position: relative;
                `;
        
                const searchBoxInput = document.createElement('input');
                searchBoxInput.id = 'searchBox';
                searchBoxInput.type = 'text';
                searchBoxInput.placeholder = searchPlaceholder;
                searchBoxInput.style.cssText = `
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                `;
        
                const autocompleteList = document.createElement('ul');
                autocompleteList.id = 'autocompleteList';
                autocompleteList.style.cssText = `
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    width: 100%;
                    background: white;
                    border: 1px solid #ddd;
                    z-index: 100;
                    display: none;
                `;
        
                searchBox.appendChild(searchBoxInput);
                searchBox.appendChild(autocompleteList);
        
                const itemList = document.createElement('ul');
                itemList.id = 'itemList';
                itemList.classList.add('item-list');
                itemList.style.cssText = `
                    list-style: none;
                    padding: 0;
                    margin: 0;
                `;
        
                const actionButtons = document.createElement('div');
                actionButtons.style.cssText = `
                    display: flex;
                    gap: 5px;
                    margin-top: 20px;
                    text-align: center;
                `;
        
                const addNewItemBtn = document.createElement('button');
                addNewItemBtn.id = 'addNewItemBtn';
                addNewItemBtn.classList.add('btn', 'btn-primary');
                addNewItemBtn.textContent = 'Add New Item';
        
                const backToAccordionBtnItem = document.createElement('button');
                backToAccordionBtnItem.id = 'backToAccordionBtnItem';
                backToAccordionBtnItem.classList.add('btn', 'btn-light');
                backToAccordionBtnItem.style.flex = '1';
                backToAccordionBtnItem.textContent = 'Back';
        
                actionButtons.appendChild(addNewItemBtn);
                actionButtons.appendChild(backToAccordionBtnItem);
        
                const popupModal = document.createElement('div');
                popupModal.id = 'popupModal';
                popupModal.style.cssText = `
                    display: none;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 300px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    z-index: 1000;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                `;
                const header = document.createElement('h3');
                header.textContent = 'Add New Item';
                header.style.cssText = `
                    margin: 0 0 10px 0;
                    text-align: center;
                `;
                const nameDiv = document.createElement('div');
                nameDiv.style.marginBottom = '15px';
        
                const nameLabel = document.createElement('label');
                nameLabel.setAttribute('for', 'itemNameInput');
                nameLabel.textContent = 'Item Name';
        
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.id = 'itemNameInput';
                nameInput.style.cssText = `
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                `;
                const quantityDiv = document.createElement('div');
                quantityDiv.style.marginBottom = '15px';
        
                const quantityLabel = document.createElement('label');
                quantityLabel.setAttribute('for', 'itemQuantityInput');
                quantityLabel.textContent = 'Quantity';
        
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.id = 'itemQuantityInput';
                quantityInput.style.cssText = `
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                `;
                const buttonDiv = document.createElement('div');
                buttonDiv.style.cssText = 'display: flex; justify-content: space-between;';
        
                const cancelBtn = document.createElement('button');
                cancelBtn.id = 'cancelPopupBtn';
                cancelBtn.classList.add('btn', 'btn-light');
                cancelBtn.textContent = 'Cancel';
        
                const confirmBtn = document.createElement('button');
                confirmBtn.id = 'confirmPopupBtn';
                confirmBtn.classList.add('btn', 'btn-primary');
                confirmBtn.textContent = 'Add';
                popupModal.appendChild(header);
                popupModal.appendChild(nameDiv);
                nameDiv.appendChild(nameLabel);
                nameDiv.appendChild(nameInput);
        
                popupModal.appendChild(quantityDiv);
                quantityDiv.appendChild(quantityLabel);
                quantityDiv.appendChild(quantityInput);
        
                popupModal.appendChild(buttonDiv);
                buttonDiv.appendChild(cancelBtn);
                buttonDiv.appendChild(confirmBtn);
    
        
                function renderItemList() {
                    itemList.innerHTML = '';
                    items.forEach((item) => {
                        const listItem = document.createElement('li');
        
                        const itemLeft = document.createElement('div');
                        itemLeft.classList.add('item-left');
                        itemLeft.innerHTML = `
                            <img src="${item.icon}" alt="${item.name}">
                            <span class="item-name">${item.name}</span>
                        `;
        
                        const quantityInput = document.createElement('input');
                        quantityInput.type = 'number';
                        quantityInput.value = item.quantity;
                        quantityInput.dataset.id = item.id;
                        quantityInput.addEventListener('change', (e) => {
                            const itemId = parseInt(e.target.dataset.id, 10);
                            const targetItem = items.find((i) => i.id === itemId);
                            if (targetItem) {
                                targetItem.quantity = parseInt(e.target.value, 10);
                                showToastMessage(`Updated quantity of ${targetItem.name}`, 'success');
                            }
                        });
                        itemLeft.appendChild(quantityInput);
                        listItem.appendChild(itemLeft);
                        itemList.appendChild(listItem);
                    });
                }
                
                function addItem(name, quantity) {
                    if (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
                        showToastMessage('Item already exists!', 'error');
                        return;
                    }
                    items.push({
                        id: Date.now(),
                        name,
                        icon: 'https://via.placeholder.com/40?text=Item',
                        quantity,
                    });
                    renderItemList();
                    showToastMessage('Item added successfully!', 'success');
                }
        
                function showPopup() {
                    popupModal.style.display = 'block';
                }
        
                function hidePopup() {
                    popupModal.style.display = 'none';
                }
        
                function filterItems(query, hideAutocomplete = false) {
                    const filtered = items.filter((item) =>
                        item.name.toLowerCase().includes(query.toLowerCase())
                    );
                    autocompleteList.innerHTML = '';
                    filtered.forEach((item) => {
                        const option = document.createElement('li');
                        option.textContent = `${item.name} (x${item.quantity})`;
                        option.style.display = 'flex';
                        option.style.alignItems = 'center';
                        option.style.padding = '5px';
                        option.style.cursor = 'pointer';
                
                        const icon = document.createElement('img');
                        icon.src = item.icon;
                        icon.style.width = '20px';
                        icon.style.height = '20px';
                        icon.style.marginRight = '10px';
                        option.prepend(icon);
    
                        option.addEventListener('click', () => {
                            searchBoxInput.value = item.name;
                            filterItems(item.name, true);
                        });
                
                        autocompleteList.appendChild(option);
                    });
    
                    if (hideAutocomplete || filtered.length === 0) {
                        autocompleteList.style.display = 'none';
                    } else {
                        autocompleteList.style.display = 'block';
                    }
                    updateItemList(query);
                }
                            
                
                function updateItemList(query) {
                    const listItems = Array.from(itemList.children);
                    let hasMatch = false;
                
                    listItems.forEach((listItem) => {
                        const itemName = listItem.querySelector('.item-name'); // Giả định item-name là class của tên item
                        if (itemName && itemName.textContent.toLowerCase().includes(query.toLowerCase())) {
                            listItem.style.display = 'flex';
                            hasMatch = true;
                        } else {
                            listItem.style.display = 'none';
                        }
                    });
                    let noResultMessage = document.getElementById('noResultMessage');
                    if (!hasMatch) {
                        if (!noResultMessage) {
                            noResultMessage = document.createElement('li');
                            noResultMessage.id = 'noResultMessage';
                            noResultMessage.textContent = 'No items found';
                            noResultMessage.style.textAlign = 'center';
                            noResultMessage.style.color = '#888';
                            noResultMessage.style.listStyle = 'none';
                            itemList.appendChild(noResultMessage);
                        }
                    } else {
                        if (noResultMessage) {
                            itemList.removeChild(noResultMessage);
                        }
                    }
                }
                
        
                addNewItemBtn.addEventListener('click', showPopup);
                cancelBtn.addEventListener('click', hidePopup);
                confirmBtn.addEventListener('click', () => {
                    const name = nameInput.value.trim();
                    const quantity = parseInt(quantityInput.value, 10);
                    if (name && quantity > 0) {
                        addItem(name, quantity);
                        hidePopup();
                    } else {
                        showToastMessage('Invalid item details!', 'error');
                    }
                });
        
                searchBoxInput.addEventListener('input', (e) => {
                    filterItems(e.target.value);
                });
                searchBoxInput.addEventListener('focus', () => {
                    filterItems(searchBoxInput.value);
                });
                const toastMessage = shadowRoot.getElementById('toastMessage');
                function showToastMessage(message, type) {
                    toastMessage.textContent = message;
                    toastMessage.style.backgroundColor = type === 'error' ? '#dc3545' : '#28a745';
                    toastMessage.style.display = 'block';
                    setTimeout(() => {
                        toastMessage.style.display = 'none';
                    }, 3000);
                }
                searchBox.appendChild(autocompleteList);
                container.appendChild(searchBox);
                container.appendChild(itemList);
                container.appendChild(actionButtons);
                shadowRoot.appendChild(popupModal)
            editItemsBtn.addEventListener('click', () => {
                accordionContainer.style.display = 'none';
                container.style.display = 'block';
                renderItemList()
            });
    
            backToAccordionBtnItem.addEventListener('click', () => {
                accordionContainer.style.display = 'block';
                container.style.display = 'none';
            });
        }
    
        createContainer({
            containerId: "itemContainer",
            items: [
                { id: 1, name: 'Potion', icon: 'https://via.placeholder.com/40?text=M1', quantity: 10 },
                { id: 2, name: 'Sword', icon: 'https://via.placeholder.com/40?text=M2', quantity: 1 },
                { id: 3, name: 'Shield', icon: 'https://via.placeholder.com/40?text=M3', quantity: 1 },
            ],
        })
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --primary-color: #007bff;
                --secondary-color: #f8f9fa;
                --danger-color: #dc3545;
                --dark-bg-color: #333;
                --dark-text-color: #ddd;
                --light-bg-color: #fff;
                --text-color: #343a40;
                --light-text-color: #333;
                --border-radius: 20px;
                --transition-duration: 0.3s;
                --edit-light-text-color: #fff;
                --edit-border-radius: 5px;
            }
    
            * {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            .menu-options, #settingsOptions {
                transition: background-color var(--transition-duration), color var(--transition-duration);
            }
    
            .menu-options {
                max-height: 200px; /* Max height for desktop */
                overflow-y: auto;
                -ms-overflow-style: none; /* Internet Explorer 10+ */
                scrollbar-width: none; /* Firefox */
            }
    
            @media (max-width: 768px) {
                .menu-options {
                    max-height: 200px; /* Max height for mobile */
                }
            }
    
            /* Hide scrollbar */
            .menu-options::-webkit-scrollbar {
                display: none;
            }
    
            .option-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 10px 0;
            }
    
            .option-label {
                font-size: 16px;
                color: var(--light-text-color);
            }
    
            .option-range, .option-input {
                width: 80px;
                padding: 5px;
                font-size: 14px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
    
            .switch-container {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
                transition: background-color var(--transition-duration);
            }
    
            .toggle-switch {
                opacity: 0;
                width: 0;
                height: 0;
            }
    
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: 0.3s;
                transition: var(--transition-duration);
                border-radius: var(--border-radius);
            }
    
            .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                transition: var(--transition-duration);
                border-radius: 50%;
            }
    
            .toggle-switch:checked + .slider {
                background-color: var(--primary-color);
            }
    
            .toggle-switch:checked + .slider:before {
                transform: translateX(20px);
            }
    
            .reset-btn, .btn {
                background-color: var(--secondary-color);
                border: 1px solid #ced4da;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
    
            .reset-btn:hover, .btn:hover {
                background-color: #e2e6ea;
            }
    
            #closeModMenu:hover {
                color: #000;
            }
    
            .dark-theme {
                background-color: var(--dark-bg-color);
                color: var(--dark-text-color);
            }
    
            .dark-theme .slider {
                background-color: #555;
            }
    
            .dark-theme .toggle-switch:checked + .slider {
                background-color: var(--primary-color);
            }
    
            .dark-theme .option-label {
                color: var(--dark-text-color);
            }
    
            .btn, .reset-btn {
                background-color: var(--secondary-color);
                border: 1px solid #ced4da;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color var(--transition-duration);
            }
    
            .btn:hover, .reset-btn:hover {
                background-color: #e2e6ea;
            }
            ::-webkit-scrollbar {
                display: none;
            }
            .option-select {
                width: 100px; /* Tăng chiều rộng phù hợp với nội dung */
                padding: 5px;
                font-size: 14px;
                border-radius: 5px;
                border: 1px solid #ccc;
                background-color: #fff; /* Màu nền trắng */
                cursor: pointer;
                transition: background-color 0.3s ease, border-color 0.3s ease;
            }

            .option-select:hover {
                background-color: #e9ecef; /* Màu khi hover */
                border-color: #adb5bd; /* Đổi màu viền khi hover */
            }

            .selected-label {
                font-size: 14px;
                color: var(--light-text-color); /* Sử dụng màu text đã định nghĩa */
                margin-left: 10px; /* Tạo khoảng cách giữa select và label */
                font-weight: bold; /* Làm nổi bật label */
            }

        `;
        style.textContent += `
            .accordion-item {
                margin-bottom: 10px;
            }
    
            .accordion-header {
                width: 100%;
                text-align: left;
                background: var(--secondary-color);
                color: var(light-text-color);
                border: none;
                padding: 10px;
                font-size: 16px;
                cursor: pointer;
                border-radius: var(--edit-border-radius);
                transition: background-color var(--transition-duration);
            }
    
            .accordion-header:hover {
                background-color: #e2e6ea;
            }
    
            .accordion-content {
                list-style: none;
                padding: 0 15px;
                margin: 0;
                max-height: 0;
                overflow: hidden;
                transition: max-height var(--transition-duration) ease-out;
            }
    
            .accordion-content li {
                margin: 5px 0;
            }
    
            /* ===================== */
            /* Form Styles */
            #monsterEditForm {
                padding: 15px;
                background-color: var(--secondary-color);
                border-radius: var(--edit-border-radius);
                border: 1px solid #ccc;
                max-width: 500px;
                margin: auto;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
    
            #monsterEditForm input,
            .form-input {
                padding: 5px 10px;
                font-size: 14px;
                border: 1px solid #ccc;
                border-radius: var(--edit-border-radius);
                margin: 5px 0;
                transition: border-color 0.2s;
            }
    
            .form-input {
                width: 100%;
            }
            .form-input:focus,
            #monsterEditForm input:focus {
                border-color: var(--primary-color);
                outline: none;
            }
    
            /* ===================== */
            /* Dropdown Styles */
            .dropdown {
                position: relative;
            }
    
            .dropdown-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: var(--edit-border-radius);
                z-index: 1000;
                max-height: 200px;
                overflow-y: auto;
            }
    
            .dropdown-menu.active {
                display: block;
            }
    
            .dropdown-item {
                display: flex;
                align-items: center;
                padding: 10px;
                cursor: pointer;
                transition: background-color var(--transition-duration);
            }
    
            .dropdown-item:hover {
                background-color: #f0f0f0;
            }
    
            .dropdown-item img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                border-radius: var(--edit-border-radius);
                border: 1px solid #ddd;
            }
    
            /* ===================== */
            /* Button Styles */
            .btn {
                padding: 10px 15px;
                border-radius: var(--edit-border-radius);
                font-size: 14px;
                cursor: pointer;
                text-align: center;
                transition: background-color var(--transition-duration);
                border: none;
            }
    
            .btn-primary {
                background-color: var(--primary-color);
                color: var(--edit-light-text-color);
            }
    
            .btn-primary:hover {
                background-color: #0056b3;
            }
    
            .btn-secondary {
                background-color: #6c757d;
                color: var(--edit-light-text-color);
            }
    
            .btn-secondary:hover {
                background-color: #5a6268;
            }
    
            .btn-danger {
                background-color: var(--danger-color);
                color: var(--edit-light-text-color);
            }
    
            .btn-danger:hover {
                background-color: #c82333;
            }
    
            .btn-light {
                background-color: var(--secondary-color);
                color: var(--text-color);
                border: 1px solid #ddd;
            }
    
            .btn-light:hover {
                background-color: #e2e6ea;
            }
    
            /* ===================== */
            /* Scrollable Content */
            .scrollable {
                max-height: 300px;
                overflow-y: auto;
            }
    
            /* ===================== */
            /* General Utilities */
            .hidden {
                display: none;
            }
    
            .center {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            /* Đặt chiều cao đồng nhất và khoảng cách giữa các thành phần */
            .item-list li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 15px;
                border-bottom: 1px solid #ddd;
                border-radius: 4px;
                background-color: #fff;
                margin-bottom: 8px;
                transition: background-color 0.2s ease-in-out;
            }
    
            .item-list li:hover {
                background-color: #f1f1f1;
            }
    
            /* Hàng trái: Icon và Tên */
            .item-list .item-left {
                display: flex;
                align-items: center;
                gap: 15px;
                flex: 1; /* Chiếm toàn bộ không gian còn lại nếu cần */
            }
    
            .item-list .item-left img {
                width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
    
            .item-list .item-left .item-name {
                font-size: 16px;
                font-weight: bold;
                color: #333;
            }
    
            /* Input số lượng */
            .item-list input[type="number"] {
                width: 60px;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 4px;
                text-align: center;
                font-size: 14px;
                margin-left: 10px;
            }
    
            /* Nút xóa */
            .item-list .btn-danger {
                background-color: #e74c3c;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 10px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.2s ease-in-out;
            }
    
            .item-list .btn-danger:hover {
                background-color: #c0392b;
            }
    
            /* Tùy chỉnh search box và autocomplete */
            #searchBox {
                box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
            }
    
            #autocompleteList li {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 5px;
                cursor: pointer;
                transition: background-color 0.2s;
            }
    
            #autocompleteList li:hover {
                background-color: #f1f1f1;
            }
    
            #autocompleteList img {
                width: 20px;
                height: 20px;
                border-radius: 4px;
                object-fit: cover;
            }
    
            .containerDiv {
                max-height: 250px;
                overflow-y: auto;
            }
    
            `;
    
        shadowRoot.appendChild(style);
    
        const toggleMenu = () => {
            if (wasDragging) {
                wasDragging = false;
                return;
            }
        
            if (modMenuContainer.style.display === 'none') {
                modMenuContainer.style.display = 'block';
                modMenuContainer.style.opacity = '1';
                modMenuIcon.style.opacity = '0';
        
                const iconRect = modMenuIcon.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                const containerWidth = modMenuContainer.offsetWidth;
                const containerHeight = modMenuContainer.offsetHeight;
                let menuLeft = iconRect.right;
                let menuTop = iconRect.bottom;
                if (menuLeft + containerWidth > canvasRect.right) {
                    menuLeft = iconRect.left - containerWidth;
                }
                if (menuTop + containerHeight > canvasRect.bottom) {
                    menuTop = iconRect.top - containerHeight;
                }
        
                // Đảm bảo menu không bị đè ra ngoài canvas
                menuLeft = Math.max(canvasRect.left, Math.min(menuLeft, canvasRect.right - containerWidth));
                menuTop = Math.max(canvasRect.top, Math.min(menuTop, canvasRect.bottom - containerHeight));
        
                modMenuContainer.style.left = `${menuLeft}px`;
                modMenuContainer.style.top = `${menuTop}px`;
            } else {
                modMenuContainer.style.opacity = '0';
                setTimeout(() => {
                    modMenuContainer.style.display = 'none';
                    modMenuIcon.style.opacity = '1';
                }, 300);
            }
        };
        
        
    
        modMenuIcon.addEventListener('click', toggleMenu);
    
        shadowRoot.getElementById('closeModMenu').addEventListener('click', toggleMenu);
        shadowRoot.getElementById('menuTitle').addEventListener('click', () => {
            inSettings = !inSettings;
            const menuOptions = shadowRoot.getElementById('accordionContainer');
            const settingsOptions = shadowRoot.getElementById('settingsOptions');
            const menuTitle = shadowRoot.getElementById('menuTitle');
    
            if (inSettings) {
                menuOptions.style.display = 'none';
                settingsOptions.style.display = 'block';
                menuTitle.innerText = 'Settings';
            } else {
                menuOptions.style.display = 'block';
                settingsOptions.style.display = 'none';
                menuTitle.innerText = 'Mod Menu';
            }
        });
        function limitToCanvas(element, startX, startY, clientX, clientY, canvas) {
            const canvasRect = canvas.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
        
            let newX = clientX - startX;
            let newY = clientY - startY;
            if (newX < canvasRect.left) {
                newX = canvasRect.left;
            } else if (newX + elementRect.width > canvasRect.right) {
                newX = canvasRect.right - elementRect.width;
            }
            if (newY < canvasRect.top) {
                newY = canvasRect.top;
            } else if (newY + elementRect.height > canvasRect.bottom) {
                newY = canvasRect.bottom - elementRect.height;
            }
        
            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        }
        
    
    
        modMenuIcon.style.left = `${canvasRect.right - 80}px`;
        modMenuIcon.style.top = `${canvasRect.bottom - 80}px`;
        
    
        modMenuIcon.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - modMenuIcon.getBoundingClientRect().left;
            startY = e.clientY - modMenuIcon.getBoundingClientRect().top;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                limitToCanvas(modMenuIcon, startX, startY, e.clientX, e.clientY, canvas);
                wasDragging = true; 
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
            }
        });
        modMenuIcon.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX - modMenuIcon.getBoundingClientRect().left;
            startY = touch.clientY - modMenuIcon.getBoundingClientRect().top;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                limitToCanvas(modMenuIcon, startX, startY, touch.clientX, touch.clientY, canvas);
            }
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
        window.addEventListener('resize', () => {
            const canvasRect = canvas.getBoundingClientRect();
            const iconRect = modMenuIcon.getBoundingClientRect();
            if (iconRect.right > canvasRect.right || iconRect.bottom > canvasRect.bottom) {
                modMenuIcon.style.left = `${canvasRect.right - 80}px`;
                modMenuIcon.style.top = `${canvasRect.bottom - 80}px`;
            }
        });
        
        const themeToggleSwitch = shadowRoot.getElementById('themeToggleSwitch');
        themeToggleSwitch.checked = isDarkTheme;
        
        themeToggleSwitch.addEventListener('change', () => {
            isDarkTheme = themeToggleSwitch.checked;
            shadowHost.classList.toggle('dark-theme', isDarkTheme);
        });
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "H" || event.key === "h" && isMenuOpen) {
            isMenuOpen = false;
        } else if (!isMenuOpen) {
            isMenuOpen = false;
        }
    });
})();
