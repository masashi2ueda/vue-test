# 参考
- [Vue.jsとDockerで作るフロントエンド　Vue.jsを最速で理解する](https://qiita.com/Brutus/items/f5c380d4e5277f357043)
- [docker composeでvolumeマウントした時のPermission Deniedへの対応](https://qiita.com/houchiey/items/ef0321956821c05b4b6a)
- [クイックスタート](https://ja.vuejs.org/guide/quick-start.html)

# 準備
- ユーザの設定
    1. vue-test/.envファイルを作成.中身は以下
        ```sh
        UID=1000
        GID=1000
        USERNAME=ホストのログインユーザ名
        ```

# 起動
- 起動
    ```sh
    docker compose up -d
    ```
