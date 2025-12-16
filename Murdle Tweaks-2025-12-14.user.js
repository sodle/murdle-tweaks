// ==UserScript==
// @name         Murdle Tweaks
// @namespace    http://tampermonkey.net/
// @version      2025-12-14
// @description  Enhancements to G. T. Karber's fantastic Murdle puzzles (does not aid in cheating)
// @author       Scott Odle <scott@sjodle.com>
// @match        https://murdle.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=murdle.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    console.log("[TWEAKS] LOADING MURDLE TWEAKS...");

    GM_addStyle('#filebox>.file {display: none;}');
    GM_addStyle('#evidence-intro>.card-subtitle {display: none;}');
    GM_addStyle('#setup {margin-bottom: 0;}');
    GM_addStyle('#setup>p:last-child {display: none;}');

    GM_addStyle('.filebox-tweaked-hidden {display: none;}');

    const mainBox = document.getElementById('mainbox');
    const intro = document.getElementById('evidence-intro');
    const filebox = document.createElement('div');
    mainBox.insertBefore(filebox, intro);

    const [suspectsBox, weaponsBox, roomsBox, motivesBox] = ["Suspects", "Weapons", "Locations", "Motives"].map(h => {
        const box = document.createElement('div');
        box.classList.add('filebox-tweaked');
        box.classList.add('filebox-tweaked-hidden');

        const header = document.createElement('h2');
        header.textContent = h;
        box.appendChild(header)

        filebox.appendChild(box);
        return box;
    })

    const loadSuspectsInterval = setInterval(() => {
        console.log('[TWEAKS] WAITING FOR SUSPECTS TO LOAD...');
        if (typeof names !== 'undefined' && typeof suspect_details !== 'undefined') {
            clearInterval(loadSuspectsInterval);
            const suspects = names.map(n => suspect_details[n]);
            console.log('[TWEAKS] FOUND SUSPECTS', suspects);
            suspects.forEach(s => {
                const susBox = document.createElement('div');
                susBox.classList.add('card-box');
                susBox.classList.add('nice-paragraph');
                susBox.classList.add('indented');

                const name = document.createElement('p');
                name.classList.add('clue-header');
                name.textContent = s.emoji + " " + s.name;
                name.style.color = s.color;
                susBox.appendChild(name);

                const description = document.createElement('p');
                description.textContent = s.biography;
                susBox.appendChild(description);

                const stats = document.createElement('p');
                stats.style.textAlign = 'center';
                stats.style.fontWeight = 'bold';
                stats.textContent = [
                    `${Math.floor(s.characteristics.height / 12)}' ${s.characteristics.height % 12}"`,
                    `${s.characteristics.hand}-handed`,
                    `${s.characteristics.eyes} eyes`,
                    `${s.characteristics.hair} hair`,
                    s.characteristics.sign,
                ].join(' • ');
                susBox.appendChild(stats);

                suspectsBox.appendChild(susBox);
            });
            suspectsBox.classList.remove('filebox-tweaked-hidden');
        }
    }, 100);

    const loadWeaponsInterval = setInterval(() => {
        console.log('[TWEAKS] WAITING FOR WEAPONS TO LOAD...');
        if (typeof weapons !== 'undefined' && typeof major_setting !== 'undefined' && typeof major_setting.weapons !== 'undefined') {
            clearInterval(loadWeaponsInterval);
            const _weapons = weapons.map(w => major_setting.weapons.filter(_w => _w.name == w)[0]);
            console.log('[TWEAKS] FOUND WEAPONS', _weapons);
            _weapons.forEach(w => {
                const wBox = document.createElement('div');
                wBox.classList.add('card-box');
                wBox.classList.add('nice-paragraph');
                wBox.classList.add('indented');

                const name = document.createElement('p');
                name.classList.add('clue-header');
                name.textContent = w.emoji + " " + w.name;
                wBox.appendChild(name);

                if (w.description) {
                    const description = document.createElement('p');
                    description.textContent = w.description;
                    wBox.appendChild(description);
                }

                if (w.clue) {
                    const clue = document.createElement('p');
                    clue.textContent = `Look for ${w.clue} left behind.`;
                    wBox.appendChild(clue);
                }

                const stats = document.createElement('p');
                stats.style.textAlign = 'center';
                stats.style.fontWeight = 'bold';
                stats.textContent = [
                    `${w.weight} weight`,
                    `made of ${w.materials.join(' and ')}`,
                ].join(' • ');
                wBox.appendChild(stats);

                weaponsBox.appendChild(wBox);
            });
            weaponsBox.classList.remove('filebox-tweaked-hidden');
        }
    }, 100);

    const loadRoomsInterval = setInterval(() => {
        console.log('[TWEAKS] WAITING FOR ROOMS TO LOAD...');
        if (typeof rooms !== 'undefined' && typeof major_setting !== 'undefined' && typeof major_setting.rooms !== 'undefined') {
            clearInterval(loadRoomsInterval);
            const _rooms = rooms.map(r => major_setting.rooms.filter(_r => _r.name == r)[0]);
            console.log('[TWEAKS] FOUND ROOMS', _rooms);
            _rooms.forEach(r => {
                const rBox = document.createElement('div');
                rBox.classList.add('card-box');
                rBox.classList.add('nice-paragraph');
                rBox.classList.add('indented');

                const name = document.createElement('p');
                name.classList.add('clue-header');
                name.textContent = r.emoji + " " + r.name;
                rBox.appendChild(name);

                const description = document.createElement('p');
                description.textContent = r.description;
                rBox.appendChild(description);

                const stats = document.createElement('p');
                stats.style.textAlign = 'center';
                stats.style.fontWeight = 'bold';
                stats.textContent = r.indoors ? 'indoors' : 'outdoors';
                rBox.appendChild(stats);

                roomsBox.appendChild(rBox);
            });
            roomsBox.classList.remove('filebox-tweaked-hidden');
        }
    }, 100);

    const loadMotivesInterval = setInterval(() => {
        console.log('[TWEAKS] WAITING FOR MOTIVES TO LOAD...');
        if (typeof motives !== 'undefined' && typeof motives_rich !== 'undefined') {
            clearInterval(loadMotivesInterval);
            const _motives = motives.map(m => {
                const out = motives_rich[m];
                out.name = m;
                return out;
            });
            console.log('[TWEAKS] FOUND MOTIVES', _motives);
            _motives.forEach(m => {
                const mBox = document.createElement('div');
                mBox.classList.add('card-box');
                mBox.classList.add('nice-paragraph');
                mBox.classList.add('indented');

                const name = document.createElement('p');
                name.classList.add('clue-header');
                name.textContent = m.emoji + " " + m.name;
                mBox.appendChild(name);

                const description = document.createElement('p');
                description.textContent = m.description;
                mBox.appendChild(description);

                motivesBox.appendChild(mBox);
            });
            motivesBox.classList.remove('filebox-tweaked-hidden');
        } else if (typeof motives_rich !== 'undefined') {
            clearInterval(loadMotivesInterval);
            console.log('[TWEAKS] NO MOTIVES TODAY');
        }
    }, 100);
})();