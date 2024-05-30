# 무인점포 에너지 절약 시스템 (팀명 : NPSS)
 <img width="400" alt="NPSS_logo3" src="https://github.com/2024-SMHRD-IS-IOT-3/NPSS/assets/165890322/6188122c-8cb7-487a-9ac2-05378d0fb306"/>
 
#### 💡 자세한 설명은 여기로  👉👉  <a href="https://github.com/2024-SMHRD-IS-IOT-3/NPSS" target='_blank'> github</a>
<br/>

## 📌서비스소개
· 태양광 발전으로 전력 사용 감소 효과<br/>
· 목표 밝기 설정으로 조명과 간판 자동 제어<br/>
· 목표 온습도 설정으로 냉난방기 자동 제어<br/>
· 자동 제어 시스템으로 전력 소비 감소<br/>
· 자동 분류 쓰레기통으로 분리수거 효율 증가<br/>


## 📌프로젝트 기간
2024.04.11 ~ 2024.05.24 (7주)
<br/>

## 📌주요기능
· 태양광 발전으로 전력 사용 감소 효과<br/>
· 목표 밝기 설정으로 조명과 간판 자동 제어<br/>
· 목표 온습도 설정으로 냉난방기 자동 제어<br/>
· 자동 제어 시스템으로 전력 소비 감소<br/>
· 자동 분류 쓰레기통으로 분리수거 효율 증가<br/>


## 📌회로설계도
#### 1. 조명 제어 (광센서 조도센서로 대체)
![조명 회로도](https://github.com/2024-SMHRD-IS-IOT-3/NPSS_IoT/assets/165890322/2b52b3c7-8d6b-447b-b29d-edab8c98abc3)

#### 2. 냉난방 제어 (모터로 대체)
![서보모터 회로도](https://github.com/2024-SMHRD-IS-IOT-3/NPSS_IoT/assets/165890322/9f0ca5a8-f350-4857-9746-a86dde5ae9bc)

#### 3. 태양광
![태양광 회로도](https://github.com/2024-SMHRD-IS-IOT-3/NPSS_IoT/assets/165890322/1ad9228b-414f-49e3-b8e8-a08afe18791c)

#### 4. 자동 분류 쓰레기통 (아두이노 나노 / 카메라는 라즈베리파이 보드에 연결)
<img width="650" alt="쓰레기통 회로도" src="https://github.com/2024-SMHRD-IS-IOT-3/NPSS_IoT/assets/165890322/d5e5dc0d-c8db-44e0-9348-3fe238193f2c">
<br/>

## 💡aws와 라즈베리파이 연동
터미널 창 가서 다음과 같은 명령어 실행<br/>
aws configure<br/>
access key, secret access key, region name, json 입력<br/>
입력 후 aws configure 데이터 입력 확인<br/>

## 💡라즈베리파이와 아두이노 우노 연동
터미널 창에서 다음과 같은 명령어 실행<br/>
sudo apt-get update<br/>
sudo apt-get upgrade<br/>
sudo apt-get install arduino<br/>

## 💡아두이노 IDE에서 라이브러리 설치
Arduino IDE 열고<br/>
스케치 → 라이브러리 포함하기 → 라이브러리 관리 클릭<br/>
Servo 검색해서 install<br/>
