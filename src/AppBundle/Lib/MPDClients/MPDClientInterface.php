<?php


namespace AppBundle\Lib\MPDClients;


interface MPDClientInterface {
    /**
     * Quering MPD status
     * @url https://www.musicpd.org/doc/protocol/command_reference.html#status_commands
     */
    public function clearError();
    public function currentSong();
    public function idle();
    public function status();
    public function stats();

    /**
     * Playback options
     * @url https://www.musicpd.org/doc/protocol/playback_option_commands.html
     */
    public function consume();
    public function crossFade();
    public function mixrampdb();
    public function random();
    public function repeat();
    public function setVol();
    public function single();
    public function replayGainMode();
    public function replayGainStatus();

    /**
     * Controling playback
     * @url https://www.musicpd.org/doc/protocol/playback_commands.html
     */
    public function next();
    public function pause();
    public function play();
    public function playId();
    public function previous();
    public function seek();
    public function seekId();
    public function seekcur();
    public function stop();

    /**
     * The current playlist
     * https://www.musicpd.org/doc/protocol/queue.html
     */

    public function add();
    public function addId();
    public function clear();
    public function delete();
    public function deleteId();
    public function move();
    public function moveId();
    public function playLists();
    public function playListFind();
    public function playListId();
    public function playListInfo();
    public function playListSearch();
    public function plChanges();
    public function plChangePosId();
    public function prio();
    public function prioId();
    public function rangeId();
    public function shuffle();
    public function swap();
    public function swapId();
    public function addTagId();
    public function clearTagId();

    /**
     * Stored playlists
     * @url https://www.musicpd.org/doc/protocol/playlist_files.html
     */
    public function listPlayList();
    public function listPlayListInfo();
    public function listPlayLists();
    public function load();
    public function playListAdd(string $name, string $uri);
    public function playListClear(string $name);
    public function playListDelete(string $name);
    public function playListMove(string $name, int $from, int $to);
    public function rename(string $name, string $newName);
    public function rm(string $name);
    public function save(string $name);

    /**
     * The music database
     * @url https://www.musicpd.org/doc/protocol/database.html
     */

    public function albumart();
    public function count();
    public function find();
    public function findAdd();
    public function list();
    public function listAll();
    public function listAllInfo();
    public function listFiles();
    public function lsInfo();
    public function readComments();
    public function search();
    public function searchAdd();
    public function searchAddPl();
    public function update();
    public function rescan();

    /**
     * Mounts and neighbors
     * @url https://www.musicpd.org/doc/protocol/mount.html
     */
    public function mount();
    public function unmount();
    public function listMounts();
    public function listNeighbors();

    /**
     * Connection settings
     * @url https://www.musicpd.org/doc/protocol/connection_commands.html
     */
    public function close();
    public function kill();
    public function ping();
    public function tagTypes();
    public function tagTypesDisable();
    public function tagTypesEnable();
    public function tagTypesCLear();
    public function tagTypesAll();

    /**
     * Partition commands
     * @url https://www.musicpd.org/doc/protocol/partition_commands.html
     */
    public function partition(string $name);
    public function listPartitions();
    public function newPartition(string $name);

    /**
     * Audio output devices
     * @url https://www.musicpd.org/doc/protocol/output_commands.html
     */

    public function disableOutput(int $id);
    public function enableOutput(int $id);
    public function toggleOutput(int $id);
    public function outputs();
    public function outputSet(int $id, string $name, int $value);

    /**
     * Reflection
     * https://www.musicpd.org/doc/protocol/reflection_commands.html
     */
    public function config();
    public function commands();
    public function notCommands();
    public function urlHandlers();
    public function decoders();

    /**
     * Client to client
     * https://www.musicpd.org/doc/protocol/client_to_client.html
     */

    public function subscribe(string $name);
    public function unsubscribe(string $name);
    public function channels();
    public function readMessages();
    public function sendMessage(string $channel, string $test);

}
