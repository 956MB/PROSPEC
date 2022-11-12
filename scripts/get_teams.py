import random
import csv

def main():
    global import_file
    teams = set()

    with open(import_file) as csvf:
        reader = csv.DictReader(csvf)
        for rows in reader:
            teams.add(rows['team_name'])

    teams = list(teams)
    sample = random.sample(range(1, 999), len(teams))
    # sample: [555, 523, 946, 218, 182, 636, 24, 978, 29, 813, 186, 374, 230, 177, 369, 179, 781, 903, 679, 484, 718, 923, 448, 154, 759, 806, 378, 364, 107, 202, 379, 453, 212, 106, 475, 347, 816, 915, 990, 328, 743, 256, 396, 584, 206, 828, 459, 715, 267, 687, 7, 838, 683, 857, 820, 677, 105, 165, 586, 565, 371, 237, 155, 865, 95, 730, 817, 904, 103, 231, 15, 394, 361, 209, 37, 74, 969, 562, 115, 635, 117, 431, 805, 407, 11, 196, 445, 735, 553, 159, 884, 335, 499, 696, 930, 506, 297, 646, 918, 607, 619, 339, 526, 578, 382]
    for i in range(0, len(teams)):
        print("{} = {},".format(teams[i], sample[i]))

    print("sample: ", sample)

if __name__ == "__main__":
    import_file = '../src/data/ttp_player_accounts.csv'

    main()