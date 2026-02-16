# Erste Übungen mit Funktionen: Lösungen

---

## Aufgabe 1: imperativ vs. deklarativ (ohne Zeichen `a` zählen)

### Imperativ

```java
public class Aufgabe1 {

    public static int calculateScore(String word) {
        int score = 0;

        for (char c : word.toCharArray()) {
            if (c != 'a') {          // zählt nur Zeichen, die NICHT 'a' sind
                score++;
            }
        }
        return score;
    }
}
```

### Deklarativ (2 Varianten)

**Variante A (String ersetzen – sehr einfach):**
```java
public class Aufgabe1 {

    public static int wordScore(String word) {
        // entfernt alle 'a' und misst die Länge
        return word.replace("a", "").length();
    }
}
```

**Variante B (Streams – funktionaler):**
```java
public class Aufgabe1 {

    public static int wordScore(String word) {
        return (int) word.chars()
                .filter(c -> c != 'a')
                .count();
    }
}
```

### Mini-Test (Beispiele aus der Aufgabe)

```java
public class Aufgabe1Test {
    public static void main(String[] args) {
        System.out.println(Aufgabe1.calculateScore("imperative") == 9);
        System.out.println(Aufgabe1.calculateScore("no") == 2);

        System.out.println(Aufgabe1.wordScore("declarative") == 9);
        System.out.println(Aufgabe1.wordScore("yes") == 3);
    }
}
```

---

## Aufgabe 2: Shopping Cart Funktion

### Schritt 1 (imperativ / „falsch“ mit Zustand)

**Problemidee:**  
Wenn man `bookAdded` als Zustand speichert, musst man beim **Entfernen** prüfen, ob noch irgendwo ein Buch im Warenkorb ist. Sonst bleibt `bookAdded` evtl. fälschlicherweise `true`.

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ShoppingCart {

    private final List<String> items = new ArrayList<>();
    private boolean bookAdded = false;

    public void addItem(String item) {
        items.add(item);
        if (isBook(item)) {
            bookAdded = true;
        }
    }

    public void removeItem(String item) {
        items.remove(item);

        //Zustand neu berechnen (sonst bleibt bookAdded evtl. falsch)
        bookAdded = items.stream().anyMatch(this::isBook);
    }

    public List<String> getItems() {
        return Collections.unmodifiableList(items);
    }

    public int getDiscountPercentage() {
        return bookAdded ? 5 : 0;
    }

    private boolean isBook(String item) {
        if (item == null) return false;
        String s = item.toLowerCase();
        return s.contains("book") || s.contains("buch");
    }
}
```

---

### Schritt 2 (funktional / nur eine Funktion, kein Zustand)

**Anforderung:** Nur **eine Funktion** `getDiscountPercentage`, die den Warenkorb als Parameter bekommt und daraus den Rabatt berechnet (ohne gespeicherten Zustand).

```java
import java.util.List;

public class ShoppingCartFunctions {

    public static int getDiscountPercentage(List<String> cartItems) {
        if (cartItems == null || cartItems.isEmpty()) return 0;

        boolean hasBook = cartItems.stream().anyMatch(ShoppingCartFunctions::isBook);
        return hasBook ? 5 : 0;
    }

    private static boolean isBook(String item) {
        if (item == null) return false;
        String s = item.toLowerCase();
        return s.contains("book") || s.contains("buch");
    }
}
```

**Kurzer Demo-Test:**
```java
import java.util.List;

public class Aufgabe2Demo {
    public static void main(String[] args) {
        System.out.println(ShoppingCartFunctions.getDiscountPercentage(List.of("Apfel", "Buch")) == 5);
        System.out.println(ShoppingCartFunctions.getDiscountPercentage(List.of("Milch", "Brot")) == 0);
    }
}
```

---

## Aufgabe 3: TipCalculator als pure Funktion

**Regeln pure Funktion:**  
- gibt einen Wert zurück  
- berechnet nur aus Parametern  
- verändert keinen Zustand  

Aus der Klasse eine reine Berechnungsfunktion:

```java
import java.util.List;

public class TipCalculatorPure {

    /**
     * @return Trinkgeld-Prozentsatz: 0, 10 oder 20
     *  - 0 Personen: 0%
     *  - 1–5 Personen: 10%
     *  - >5 Personen: 20%
     */
    public static int getTipPercentage(List<String> names) {
        if (names == null || names.isEmpty()) {
            return 0;
        }

        int size = names.size();
        if (size > 5) {
            return 20;
        }
        return 10; // size ist hier 1..5
    }
}
```

**Optional (falls man direkt Trinkgeldbetrag will):**
```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class TipCalculatorPure {

    public static int getTipPercentage(List<String> names) {
        if (names == null || names.isEmpty()) return 0;
        return names.size() > 5 ? 20 : 10;
    }

    public static BigDecimal calculateTipAmount(BigDecimal billAmount, List<String> names) {
        if (billAmount == null) return BigDecimal.ZERO;

        int pct = getTipPercentage(names);
        return billAmount
                .multiply(BigDecimal.valueOf(pct))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}
```

**Kurzer Demo-Test:**
```java
import java.util.List;

public class Aufgabe3Demo {
    public static void main(String[] args) {
        System.out.println(TipCalculatorPure.getTipPercentage(List.of()) == 0);
        System.out.println(TipCalculatorPure.getTipPercentage(List.of("Fritz")) == 10);
        System.out.println(TipCalculatorPure.getTipPercentage(List.of("Fritz", "Franz", "Hugo", "Erwin", "Markus")) == 10);
        System.out.println(TipCalculatorPure.getTipPercentage(List.of("Fritz", "Franz", "Hugo", "Erwin", "Markus", "Martin")) == 20);
    }
}
```

