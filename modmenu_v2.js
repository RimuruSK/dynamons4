let isTriggered = false;

document.addEventListener('keydown', (event) => {
    // Kiểm tra phím được nhấn (VD: Enter - keyCode 13 hoặc 'Enter')
    if (event.key === 'Enter' && !isTriggered) {
        isTriggered = true;
        (function () {
            const shadowHost = document.createElement('div');
            shadowHost.style.position = 'fixed';
            shadowHost.style.bottom = '20px';
            shadowHost.style.right = '20px';
            shadowHost.style.zIndex = '9999';
            shadowHost.style.userSelect = 'none'; 
            const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
            let startX, startY;
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
            modMenuIcon.innerHTML = `<img src="icon.png" alt="icon" draggable="false" style="width: 100%; height: 100%; border-radius: 50%;">`;
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

            setInterval(() => {
                if (!dropdownName) return;
                dropdownName.textContent = `${monster._data.title} (Lv ${monster._level})`;
            }, 500)
        
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
                        Object.entries(items).forEach(([key, value]) => {
                            const listItem = document.createElement('li');
            
                            const itemLeft = document.createElement('div');
                            itemLeft.classList.add('item-left');
                            const itemName = runGameCode(`K.getItem('${value}').title`);
                            itemLeft.innerHTML = `
                                <img src="${itemName}" alt="${itemName}">
                                <span class="item-name">${itemName}</span>
                            `;
            
                            const quantityInput = document.createElement('input');
                            quantityInput.type = 'number';
                            quantityInput.value = value;
                            quantityInput.dataset.id = key;
                            quantityInput.addEventListener('change', (e) => {
                                const itemId = e.target.dataset.id;
                                if (itemId) {
                                    runGameCode(`u._playerItems.h.${itemId} = ${e.target.value}`)
                                    showToastMessage(`Updated quantity of ${itemId}`, 'success');
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
                items: runGameCode(`u._playerItems.h`),
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
        })();
        
    }
});
