IFS
==========
Infinite flight ship.
 
New version <http://mds.planeset.ru>

Для памяти
    * Поставил yarn add jquery   yarn add @types/jquery   и  import * as $ from "jquery" для подключения в typescript
    * Остановленный контейнер с изменениями нужно коммитить в образ и запускать
    
    Стартуем образ docker run -ti --entrypoint=sh --name=name_container image:name
    Колдуем.
    После выхода смотрим если надо имя контейнера
    
    docker ps -l  (-a )
    
    Commit the stopped container:
    
    docker commit name_container new_image_name
    docker run -ti --entrypoint=sh --name=name_container new_image_name

    
