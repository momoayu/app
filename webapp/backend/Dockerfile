FROM python:3.12.3
# 環境変数 PYTHONUNBUFFEREDを設定
ENV PYTHONUNBUFFERED 1
# mkdirコマンドの実行
RUN mkdir /code
RUN mkdir /code/backend
RUN mkdir /code/frontend
# 作業ディレクトリの設定
WORKDIR /code/backend
# backendのプロジェクトフォルダを/codeに追加する
COPY ./backend /code/backend
# Pythonのパッケージ管理ツールのpipをアップグレード
RUN pip install --upgrade pip
# pipでrequirements.txtに指定されているパッケージを追加する
RUN pip install -r requirements.txt